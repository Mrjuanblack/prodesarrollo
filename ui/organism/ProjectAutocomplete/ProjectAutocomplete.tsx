import { Autocomplete, AutocompleteItem, Chip } from "@heroui/react";
import { useInfiniteScroll } from "@heroui/use-infinite-scroll";
import { useProjectsAutocomplete } from "@/hooks/project/useProjectsAutocomplete";
import { Project, SimpleProject } from "@/domain/Projects";
import { useState, useMemo, useEffect } from "react";
import apiClient from "@/hooks/api-client";

interface ProjectAutocompleteProps {
    label?: string;
    placeholder?: string;
    editedProjectId?: string;
    onSelectionChange?: (projects: SimpleProject[]) => void;
    selectedProjects?: string[];
    initialProjects?: SimpleProject[];
    isInvalid?: boolean;
    errorMessage?: string;
}

export const ProjectAutocomplete: React.FC<ProjectAutocompleteProps> = ({
    label = "Buscar proyecto",
    placeholder = "Escribe el nombre del proyecto...",
    editedProjectId,
    onSelectionChange,
    selectedProjects = [],
    initialProjects = [],
    isInvalid,
    errorMessage
}) => {
    const [searchValue, setSearchValue] = useState("");
    const [debouncedSearchValue, setDebouncedSearchValue] = useState("");
    const [isOpen, setIsOpen] = useState(false);
    const [projectCache, setProjectCache] = useState<Map<string, Project>>(initialProjects ? new Map(initialProjects.map(project => [project.id, project])) : new Map());

    // Debounce search input
    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedSearchValue(searchValue);
        }, 1000);

        return () => clearTimeout(timer);
    }, [searchValue]);

    const { items, hasMore, isLoading, onLoadMore } = useProjectsAutocomplete({
        search: debouncedSearchValue,
    });

    // Show loading when user is typing (debouncing)
    const isTyping = searchValue !== debouncedSearchValue;
    const showLoading = isLoading || isTyping;

    // Use HeroUI's built-in infinite scroll
    const [, scrollerRef] = useInfiniteScroll({
        hasMore,
        isEnabled: isOpen,
        shouldUseLoader: false,
        onLoadMore,
    });

    // Update cache whenever new items are loaded
    useMemo(() => {
        const newCache = new Map(projectCache);
        items.forEach(project => {
            if (!newCache.has(project.id)) {
                newCache.set(project.id, project);
            }
        });
        if (newCache.size > projectCache.size) {
            setProjectCache(newCache);
        }
    }, [items]);

    const handleRemoveProject = (projectId: string) => {
        const newSelection = selectedProjects.filter(project => project !== projectId);
        onSelectionChange?.(newSelection.map(project => projectCache.get(project) as SimpleProject));
    };

    const handleAddProject = (key: React.Key | null) => {
        if (key && !selectedProjects.some(project => project === key.toString())) {
            const projectId = key.toString();
            const project = items.find(p => p.id === key.toString());

            // Add project to cache when selected
            if (project) {
                const newCache = new Map(projectCache);
                newCache.set(projectId, project);
                setProjectCache(newCache);
                
                const newSelection = [...selectedProjects, projectId];
                onSelectionChange?.(newSelection.map(id => newCache.get(id) as SimpleProject));
                // Clear the input after selection
                setSearchValue("");
                // Close the autocomplete dropdown
                setIsOpen(false);
            }


        }
    };

    const getDisabledKeys = () => {
        const disabledKeys: string[] = [];
        if (editedProjectId) {
            disabledKeys.push(editedProjectId);
        }
        if (selectedProjects.length > 0) {
            selectedProjects.forEach(project => {
                disabledKeys.push(project);
            });
        }
        return disabledKeys;
    }

    return (
        <div className="flex flex-col gap-2">
            <Autocomplete
                label={label}
                placeholder={placeholder}
                inputValue={searchValue}
                onInputChange={setSearchValue}
                selectedKey={null}
                onSelectionChange={handleAddProject}
                isLoading={showLoading}
                items={items}
                scrollRef={scrollerRef}
                onOpenChange={setIsOpen}
                isInvalid={isInvalid}
                errorMessage={errorMessage}
                listboxProps={{
                    emptyContent: searchValue.length < 2
                        ? "Escribe al menos 2 caracteres para buscar"
                        : "No se encontraron proyectos"
                }}
                disabledKeys={getDisabledKeys()}
            >
                {(project) => (
                    <AutocompleteItem
                        key={project.id}
                        textValue={project.title}
                    >
                        <div className="flex flex-col">
                            <span className="text-small">{project.title}</span>
                            <span className="text-tiny text-default-400">
                                {project.status} - {new Date(project.date).toLocaleDateString()}
                            </span>
                        </div>
                    </AutocompleteItem>
                )}
            </Autocomplete>

            {selectedProjects.length > 0 && (
                <div className="flex flex-wrap gap-2">
                    {selectedProjects.map(project => {
                        return (
                            <Chip
                                key={project}
                                onClose={() => handleRemoveProject(project)}
                                variant="flat"
                                color="primary"
                            >
                                {projectCache.get(project)?.title}
                            </Chip>
                        );
                    })}
                </div>
            )}
        </div>
    );
};

