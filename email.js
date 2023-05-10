const sendMail = () => {
    const name = document.getElementsByClassName("feedback-body__email")[0].value;
    const body = document.getElementsByClassName("feedback-body__message")[0].value;
    window.location.href = "mailto:alexwang99311@yahoo.com?subject=Hello! My name is" + name + "&body=" + body;
}