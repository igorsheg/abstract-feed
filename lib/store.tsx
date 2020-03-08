const feedSettings = {
    section: {
        id: null,
        name: null
    },
    organization: {
        id: null,
        name: null
    },
    delays: {
        refresh: 60 * 60 * 1000,
        projects: 60 * 1000,
        collections: (60 * 1000) / 3,
        previews: (60 * 1000) / 3 / 3
    }
};

const UiStore = {
    isLoading: true
};
export { feedSettings, UiStore };
