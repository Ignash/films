export default function getCurrentArrayButton(totalPages, currentPage) {
    const leftLimit = 3;
    const rightLimit = 3;
    const pagesInPag = leftLimit + rightLimit + 1;
    let arrayButton = [];
    if (totalPages <= pagesInPag) {
        for (let i = 1; i <= totalPages; i++) {
            arrayButton.push(i);
        }
        return arrayButton;
    }
    if (currentPage <= leftLimit) {
        for (let i = 1; i <= pagesInPag; i++) {
            arrayButton.push(i);
        }
        return arrayButton;
    }
    if (totalPages - currentPage <= rightLimit) {
        for (let i = totalPages - pagesInPag + 1; i <= totalPages; i++) {
            arrayButton.push(i);
        }
        return arrayButton;
    }

    for (let i = currentPage - leftLimit; i <= currentPage + rightLimit; i++) {
        arrayButton.push(i);
    }
    return arrayButton;
}
