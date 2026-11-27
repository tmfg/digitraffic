import $ from "jquery";

export default function () { /* … */ }

/* Active filters object */
const activeFilters = {
    traffictype: [],
    status: []
};

let visibleAmounts = {
    traffictype: [],
    status: []
};

/* Init when dom is fully loaded */
$(() => initFilterDevelopments());

function initFilterDevelopments() {
    if (!document.getElementById('developments-amount')) {
        // Not developments page => do not init anything
        return;
    }

    // Add filter check box event listeners
    addEventListeners();

    // Get URL parameters for filters
    getParams();

    // Show/hide developments based on active filters
    showHideDevs();

    // Update amounts of visible developments for filters
    updateVisibleAmounts();
}

function addEventListeners() {
    [].slice.call(document.body.querySelectorAll('.checkbox input[type="checkbox"]')).forEach(element => {
        element.addEventListener("change", toggleFilter, false);
    });
}

function getParams() {
    const params = new URLSearchParams(window.location.search);

    Object.keys(activeFilters).forEach(filterType => {
        const values = (params.get(filterType) || "").split(",").filter(Boolean);
        const filterSection = document.body.querySelector(`ul[data-filtersection="${filterType}"]`);

        if (!filterSection) {
            return;
        }

        filterSection.querySelectorAll('input[type="checkbox"]').forEach(checkbox => {
            if (values.includes(checkbox.dataset.filtervalue)) {
                checkbox.checked = true;
                activeFilters[filterType].push(checkbox.dataset.filtervalue);
            }
        });
    });
}

function updateFilterUrl() {
    const url = new URL(window.location.href);

    Object.entries(activeFilters).forEach(([filterType, values]) => {
        if (values.length > 0) {
            url.searchParams.set(filterType, values.join(","));
        } else {
            url.searchParams.delete(filterType);
        }
    });

    window.history.replaceState(null, "", `${url.pathname}${url.search}${url.hash}`);
}

function toggleFilter() {
    let filtertype = this.dataset.filtertype;
    let filtervalue = this.dataset.filtervalue;
    if (this.checked) {
        if (activeFilters[filtertype].indexOf(filtervalue) < 0) {
            activeFilters[filtertype].push(filtervalue);
        }
    } else {
        if (activeFilters[filtertype].indexOf(filtervalue) >= 0) {
            activeFilters[filtertype].splice(activeFilters[filtertype].indexOf(filtervalue), 1);
        }
    }
    updateFilterUrl();
    showHideDevs();
    updateVisibleAmounts();
}

// Show/hide developments based on active filters
function showHideDevs() {
    let developments = [].slice.call(document.body.querySelectorAll('.developments__development'));
    developments.forEach(post => {
        // Get traffictypes and status for all developments
        let appTraffictypes = post.dataset.traffictypes.split(',');
        let appStatus = post.dataset.status.split(',');

        // Filter conditions
        let showByTraffictype = hasSharedValue(appTraffictypes, activeFilters.traffictype) || activeFilters.traffictype.length === 0;
        let showByStatus = hasSharedValue(appStatus, activeFilters.status) || activeFilters.status.length === 0;

        // Show only developments with shared traffictype or status OR if filters are not set
        if (showByTraffictype && showByStatus) {
            post.classList.remove('developments__development--hidden');
        } else {
            post.classList.add('developments__development--hidden');
        }
    });

    // Style last development
    // If --last class exists, remove it
    let lastDevelopment = document.body.querySelector('.developments__development--last');
    if (lastDevelopment) {
        lastDevelopment.classList.remove('developments__development--last');
    }
    // Get visible developments
    let visibleDevelopments = [];
    developments.forEach((app) => {
        if (app.classList.contains('developments__development') && !app.classList.contains('developments__development--hidden')) {
            visibleDevelopments.push(app);
        }
    });
    // Update amount of developments
    document.getElementById('developments-amount').innerText = visibleDevelopments.length;
    // Add --last class to last visible development
    let noAppsClasses = document.body.querySelector('.developments__no-developments').classList;
    if (visibleDevelopments.length > 0) {
        if (!noAppsClasses.contains('developments__no-developments--hidden')) {
            noAppsClasses.add('developments__no-developments--hidden');
        }
        visibleDevelopments[visibleDevelopments.length - 1].classList.add('developments__development--last');
    } else {
        if (noAppsClasses.contains('developments__no-developments--hidden')) {
            noAppsClasses.remove('developments__no-developments--hidden');
        }
    }
}

// Check if two arrays share any values
function hasSharedValue(arr1, arr2) {
    let isShared = false;
    arr1.forEach(arr1val => {
        if (!isShared) {
            isShared = arr2.some(arr2val => arr1val === arr2val);
        }
    });
    return isShared;
}

// Update visible amounts for filters
function updateVisibleAmounts() {
    // Reset visible amounts
    visibleAmounts = {
        traffictype: [],
        status: []
    };

    // Get updated visible amounts
    [].slice.call(document.body.querySelectorAll('.developments__development')).forEach(element => {
        // Check that element is visible
        if (!element.classList.contains('developments__development--hidden')) {

            // Traffictypes
            element.dataset.traffictypes.split(',').forEach(traffictype => {
                let found = false;
                visibleAmounts.traffictype.forEach(visibleFilter => {
                    if (visibleFilter[0] === traffictype) {
                        visibleFilter[1]++;
                        found = true;
                    }
                });
                if (!found) {
                    visibleAmounts.traffictype.push([traffictype, 1]);
                }
            });

            // Status
            let status = element.dataset.status;
            let found = false;
            visibleAmounts.status.forEach(visibleFilter => {
                if (visibleFilter[0] === status) {
                    visibleFilter[1]++;
                    found = true;
                }
            });
            if (!found) {
                visibleAmounts.status.push([status, 1]);
            }
        }
    });

    [].slice.call(document.body.querySelectorAll('.sidebar__filter-amount')).forEach(element => {
        let filtertype = element.dataset.filtertype;
        let found = false;
        visibleAmounts[filtertype].forEach(visibleFilter => {
            if (element.dataset.filtervalue === visibleFilter[0]) {
                element.innerText = visibleFilter[1];
                found = true;
            }
            if (!found) {
                element.innerText = 0;
            }
        });
        if (visibleAmounts[filtertype].length === 0) {
            element.innerText = 0;
        }
    });
}
