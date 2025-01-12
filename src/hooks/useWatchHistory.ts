import useLocalStorageState from "use-local-storage-state";
import type { ThemeSummaryCardThemeFragment } from "generated/graphql";

interface WatchHistoryTheme extends ThemeSummaryCardThemeFragment {
    id: number
}

export type WatchHistory = Array<WatchHistoryTheme>;

export default function useWatchHistory() {
    const [ history, setHistory ] = useLocalStorageState<WatchHistory>("history", { ssr: true, defaultValue: [] });

    function addToHistory(theme: WatchHistoryTheme) {
        // Don't add if the most recent entry is the same as the new one
        if (history[history.length - 1]?.id === theme.id) {
            return;
        }

        setHistory((history) => {
            // Remove all previous occurences of the theme to avoid duplicates
            const newHistory = history.filter((t) => t.id !== theme.id);

            newHistory.push(theme);

            // Keep history below 100 entries
            if (newHistory.length > 100) {
                newHistory.shift();
            }

            return newHistory;
        });
    }

    function clearHistory() {
        setHistory([]);
    }

    return {
        history,
        addToHistory,
        clearHistory,
    };
}
