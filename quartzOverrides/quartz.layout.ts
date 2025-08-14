import {PageLayout, SharedLayout} from "./quartz/cfg"
import * as Component from "./quartz/components"

// components shared across all pages
export const sharedPageComponents: SharedLayout = {
    head: Component.Head(),
    header: [],
    afterBody: [],
    footer: Component.Footer({
        links: {
            "Impressum": "/impressum",
            "Datenschutz": "/datenschutz",
            "Discord-Community": "https://discord.gg/9VeHUXx8",
        },
    }),
}

const explorerConfig = Component.Explorer({
    filterFn: (node) => {

        // Exclude specific nodes from the explorer
        const omit = new Set([
            "impressum",
            "datenschutz"
        ]);

        return !omit.has(node.displayName.toLowerCase());
    },
    sortFn: (a, b) => {

        // Custom sort order for specific nodes

        const order = [
            "grundlagen",
            "die spirale"
        ];

        const nameA = a.displayName.toLowerCase();
        const nameB = b.displayName.toLowerCase();

        const indexA = order.indexOf(nameA);
        const indexB = order.indexOf(nameB);

        if (indexA !== -1 && indexB !== -1) return indexA - indexB;
        if (indexA !== -1) return -1;
        if (indexB !== -1) return 1;

        return nameA.localeCompare(nameB);
    },
});

// components for pages that display a single page (e.g. a single note)
export const defaultContentPageLayout: PageLayout = {
    beforeBody: [
        Component.Breadcrumbs(),
        Component.ArticleTitle(),
        Component.ContentMeta(),
        Component.TagList(),
    ],
    left: [
        Component.PageTitle(),
        Component.MobileOnly(Component.Spacer()),
        Component.Search(),
        Component.Darkmode(),
        Component.DesktopOnly(explorerConfig),
    ],
    right: [
        Component.Graph(),
        Component.DesktopOnly(Component.TableOfContents()),
        Component.DesktopOnly(Component.Backlinks()),
    ],
}

// components for pages that display lists of pages  (e.g. tags or folders)
export const defaultListPageLayout: PageLayout = {
    beforeBody: [
        Component.Breadcrumbs(),
        Component.ArticleTitle(),
        Component.ContentMeta(),
        Component.TagList(),
    ],
    left: [
        Component.PageTitle(),
        Component.MobileOnly(Component.Spacer()),
        Component.Search(),
        Component.Darkmode(),
        Component.DesktopOnly(explorerConfig),
    ],
    right: [
        Component.Graph(),
        Component.DesktopOnly(Component.TableOfContents()),
        Component.DesktopOnly(Component.Backlinks()),
    ],
}
