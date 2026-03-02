import { useState, useEffect } from "react";

/**
 * Detects whether the element directly behind the fixed bottom header
 * is "dark" or "light", then returns a theme string accordingly.
 *
 * Convention: add  data-header-theme="dark"  to any <section> / <div>
 * whose background is dark. All others default to "light".
 */
const useHeaderTheme = () => {
    const [theme, setTheme] = useState("light");

    useEffect(() => {
        // Sample the element at the visual center of the header pill
        // (fixed bottom-6, roughly 60px from bottom, center-x)
        const samplePoint = () => {
            const x = window.innerWidth / 2;
            const y = window.innerHeight - 60; // approximate pill center
            const el = document.elementFromPoint(x, y);
            if (!el) return;

            // Walk up the DOM to find the nearest data-header-theme attribute
            let node = el;
            while (node && node !== document.body) {
                const t = node.getAttribute?.("data-header-theme");
                if (t) {
                    setTheme(t);
                    return;
                }
                node = node.parentElement;
            }
            // Default to light if nothing found
            setTheme("light");
        };

        // Run on scroll and on resize
        samplePoint();
        window.addEventListener("scroll", samplePoint, { passive: true });
        window.addEventListener("resize", samplePoint, { passive: true });

        return () => {
            window.removeEventListener("scroll", samplePoint);
            window.removeEventListener("resize", samplePoint);
        };
    }, []);

    return theme;
};

export default useHeaderTheme;
