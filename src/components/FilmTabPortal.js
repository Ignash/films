import { useEffect, useState } from "react";
import ReactDOM from "react-dom";

export default function FilmTabPortal({ children, closePortal }) {
    const [win, setWin] = useState(null);
    const [container, setContainer] = useState(null);

    useEffect(() => {
        const containerCreate = document.createElement("div");
        const windowPortal = window.open(
            "",
            "",
            "width=1000,height=800,left=50,top=50"
        );

        windowPortal.document.body.appendChild(containerCreate);

        windowPortal.addEventListener("beforeunload", () => {
            closePortal();
        });

        setWin(windowPortal);
        setContainer(containerCreate);

        return () => {
            windowPortal?.close();
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        if (win) {
          copyStyles(document, win.document);
        }
    }, [win]);

    return container && ReactDOM.createPortal(children, container);
}

function copyStyles(sourceDoc, targetDoc) {
  
    Array.from(sourceDoc.styleSheets).forEach((styleSheet) => {
        if (styleSheet.cssRules) {
            // for <style> elements
            const newStyleEl = sourceDoc.createElement("style");

            Array.from(styleSheet.cssRules).forEach((cssRule) => {
                // write the text of each rule into the body of the style element
                newStyleEl.appendChild(
                    sourceDoc.createTextNode(cssRule.cssText)
                );
            });

            targetDoc.head.appendChild(newStyleEl);
        } else if (styleSheet.href) {
            // for <link> elements loading CSS from a URL
            const newLinkEl = sourceDoc.createElement("link");

            newLinkEl.rel = "stylesheet";
            newLinkEl.href = styleSheet.href;
            targetDoc.head.appendChild(newLinkEl);
        }
    });
}
// function copyStyles(sourceDoc, targetDoc) {
    // Array.from(
    //     sourceDoc.querySelectorAll('link[rel="stylesheet"], style')
    // ).forEach((link) => {
    //     targetDoc.head.appendChild(link.cloneNode(true));
    // });
// }


