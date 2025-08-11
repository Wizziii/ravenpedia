import {PageLayout, SharedLayout} from "./quartz/cfg"
import * as Component from "./quartz/components"
import {Options} from "./quartz/components/Explorer"

// components shared across all pages
export const sharedPageComponents: SharedLayout = {
    head: Component.Head(),
    header: [],
    afterBody: [],
    footer: Component.Footer({
        links: {
            GitHub: "https://github.com/jackyzha0/quartz",
            "Discord Community": "https://discord.gg/cRFFHYye7t",
        },
    }),
}

// Define your custom sort function
const customSort: Options["sortFn"] = (a, b) => {
    // Define the desired order of your files/folders by their display name
    const pinnedOrder = ["Grundlagen", "Die Spirale", "Magieschulen"]; // Case-sensitive

    const aName = a.displayName;
    const bName = b.displayName;

    const aIndex = pinnedOrder.indexOf(aName);
    const bIndex = pinnedOrder.indexOf(bName);

    // If both are in the pinned list, sort by their defined order
    if (aIndex > -1 && bIndex > -1) {
        return aIndex - bIndex;
    }

    // If only 'a' is pinned, it should come first
    if (aIndex > -1) {
        return -1;
    }

    // If only 'b' is pinned, it should come first
    if (bIndex > -1) {
        return 1;
    }

    // Fallback for folders first, then alphabetical for everything else
    if (a.isFolder && !b.isFolder) {
        return -1;
    }
    if (!a.isFolder && b.isFolder) {
        return 1;
    }

    // Default alphabetical sort for non-pinned items
    return aName.localeCompare(bName, undefined, {
        numeric: true,
        sensitivity: "base",
    });
};


// components for pages that display a single page (e.g. a single note)
export const defaultContentPageLayout: PageLayout = {
    Component.ArticleTitle(),
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
        Component.DesktopOnly(Component.Explorer({
            sortFn: customSort,
        })),
    ],
    right: [
        Component.Graph(),
        Component.DesktopOnly(Component.TableOfContents()),
        Component.Backlinks(),
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
        Component.DesktopOnly(Component.Explorer({
            sortFn: customSort,
        })),
    ],
    right: [
        Component.Graph(),
        Component.DesktopOnly(Component.TableOfContents()),
        Component.Backlinks(),
    ],
}
