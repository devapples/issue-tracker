export default async function captcha({then, fail, final, captchaExpect, captchaGuide}) {
    const captchaUser = window.prompt(captchaGuide);

    let cont = false;
    if (captchaUser !== null) {
        if (captchaUser !== captchaExpect) window.alert('Wrong captcha!');
        else if (!window.confirm('Continue?')) window.alert('[Cancelled]');
        else cont = true;
    }

    if (cont) then?.(captchaUser);
    else fail?.(captchaUser);
    final?.(captchaUser);
}
