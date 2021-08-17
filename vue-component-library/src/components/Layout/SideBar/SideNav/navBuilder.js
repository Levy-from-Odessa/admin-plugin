
import MetisMenu from "metismenujs/dist/metismenujs";

export default {
        mounted(){
            // eslint-disable-next-line no-unused-vars
            var menuRef = new MetisMenu("#side-menu");
            var links = document.getElementsByClassName("side-nav-link-ref");
            var matchingMenuItem = null;
            const paths = [];

            for (var i = 0; i < links.length; i++) {
                paths.push(links[i]["pathname"]);
            }
            var itemIndex = paths.indexOf(window.location.pathname);
            if (itemIndex === -1) {
                const strIndex = window.location.pathname.lastIndexOf("/");
                const item = window.location.pathname.substr(0, strIndex).toString();
                matchingMenuItem = links[paths.indexOf(item)];
            } else {
                matchingMenuItem = links[itemIndex];
            }
            
            if (matchingMenuItem) {
                matchingMenuItem.classList.add("active");
                


                var parent = matchingMenuItem.parentElement;
                /**
                 * TODO: This is hard coded way of expading/activating parent menu dropdown and working till level 3.
                 * We should come up with non hard coded approach
                 */
                if (parent) {
                    parent.classList.add("mm-active");
                    const parent2 = parent.parentElement.closest("ul");
                    if (parent2 && parent2.id !== "side-menu") {
                        parent2.classList.add("mm-show");
                        
                        const parent3 = parent2.parentElement;
                        if (parent3) {
                            parent3.classList.add("mm-active");
                            var childAnchor = parent3.querySelector(".has-arrow");
                            var childDropdown = parent3.querySelector(".has-dropdown");
                            if (childAnchor) childAnchor.classList.add("mm-active");
                            if (childDropdown) childDropdown.classList.add("mm-active");
                            
                            const parent4 = parent3.parentElement;
                            if (parent4 && parent4.id !== "side-menu") {
                                parent4.classList.add("mm-show");
                                const parent5 = parent4.parentElement;
                                if (parent5 && parent5.id !== "side-menu") {
                                    parent5.classList.add("mm-active");
                                    const childanchor = parent5.querySelector(".is-parent");
                                    if (childanchor && parent5.id !== "side-menu") {
                                        childanchor.classList.add("mm-active");
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }

}