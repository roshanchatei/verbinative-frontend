export const getTimeOrDate = (timestamp) => {
    const now = new Date();
    const messageDate = new Date(timestamp);

    const daysDiff = (now.getTime() - messageDate.getTime()) / (1000 * 3600 * 24);

    if (daysDiff < 1) {
        return messageDate.toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'});
    } else if (daysDiff < 7) {
        return `${parseInt(daysDiff)} days ago`
    } else {
        const yyyy = messageDate.getFullYear();
        let mm = messageDate.getMonth() + 1;
        let dd = messageDate.getDate();

        if (dd < 10) dd = '0' + dd;
        if (mm < 10) mm = '0' + mm;

        return dd + '/' + mm + '/' + yyyy;
    }
}