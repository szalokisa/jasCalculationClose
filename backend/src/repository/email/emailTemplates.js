import Customerportal from '../Customerportal';

export const emailTemplates = {
    async registration(user) {
        const customerportal = new Customerportal();
        const registrationToken = await customerportal.getRegistrationToken(user);

        let mailOptions;

        const userName = user.name || user.Name;
        const emailAddress = user.email || user.Email;

        switch (user.language || user.lang || user.Lang) {
            case 'hu':
                mailOptions = {
                    from: process.env.EMAIL_FROM,
                    to: emailAddress,
                    subject: 'YUSEN CUSTOMER PORTAL regisztráció',
                    text:
                        `Tisztelt ${userName}! \n\nSzeretettel köszöntjük online ügyfélkapu szolgáltatásunk felhasználói között!\n\nKérjük erősítse meg email címét erre a linkre kattintva:\n ${process.env.REG_EMAIL_LINK_ACCEPTED}/${registrationToken}\n\nKöszönjük!\n\nHa Ön nem szeretné ezt a szolgáltatást igénybe venni, akkor kérjük kattintson erre a link-re:\n ${process.env.REG_EMAIL_LINK_DISMISSED}/${registrationToken}\n\n\nÜdvözlettel:\n\nA YUSEN (Hungary) csapata`,
                    html: `<b>Tisztelt ${userName}!</b><br><br>Szeretettel köszöntjük online ügyfélkapu szolgáltatásunk felhasználói között!<br><br>Kérjük erősítse meg e-mail címét erre a linkre kattintva: <a href="${process.env.REG_EMAIL_LINK_ACCEPTED}/${registrationToken}">ELFOGADOM.</a>
                    <br><br>Köszönjük!<br><br>Ha Ön nem szeretné ezt a szolgáltatást igénybe venni, akkor kérjük kattintson ide: <a href="${process.env.REG_EMAIL_LINK_DISMISSED}/${registrationToken}"> NEM FOGADOM EL</a><br><br><br>Üdvözlettel:<br>A YUSEN (Hungary) csapata`,
                };
                break;

            case 'de':
                mailOptions = {
                    from: process.env.EMAIL_FROM,
                    to: emailAddress,
                    subject: 'YUSEN CUSTOMER PORTAL Registrierung',
                    text:
                        `Sehr geehrte(r) ${userName}! \n\nHerzlich willkommen bei unserem Online-Kundenportal-Service!\n\nBitte bestätigen Sie Ihre E-Mail-Adresse, indem Sie auf diesen Link klicken:\n ${process.env.REG_EMAIL_LINK_ACCEPTED}/${registrationToken}\n\nDanke!\n\nWenn Sie diesen Dienst nicht nutzen möchten, klicken Sie bitte auf diesen Link:\n ${process.env.REG_EMAIL_LINK_DISMISSED}/${registrationToken}\n\n\nMit freundlichen grüßen:\n\nTeam von YUSEN (Hungary)`,
                    html: `<b>Sehr geehrte(r) ${userName}!</b><br><br>Herzlich willkommen bei unserem Online-Kundenportal-Service!<br><br>Bitte bestätigen Sie Ihre E-Mail-Adresse, indem Sie auf diesen Link klicken: <a href="${process.env.REG_EMAIL_LINK_ACCEPTED}/${registrationToken}">ICH BESTÄTIGE</a>
        <br><br>Danke!<br><br>Wenn Sie diesen Dienst nicht nutzen möchten, klicken Sie bitte auf diesen Link: <a href="${process.env.REG_EMAIL_LINK_DISMISSED}/${registrationToken}">ICH LEHNE AB</a><br><br><br>Mit freundlichen Grüßen:<br>Team von YUSEN (Hungary)`,
                };
                break;

            default:
                mailOptions = {
                    from: process.env.EMAIL_FROM,
                    to: emailAddress,
                    subject: 'YUSEN CUSTOMER PORTAL registration',
                    text:
                        `Dear ${userName}! \n\nWelcome to our online customer portal service!\n\nPlease confirm your email address by clicking on this link:\n ${process.env.REG_EMAIL_LINK_ACCEPTED}/${registrationToken}\n\Thanks!\n\nIf you do not wish to use this service, please click on this link:\n ${process.env.REG_EMAIL_LINK_DISMISSED}/${registrationToken}\n\n\nWith kind regards:\n\nTeam von YUSEN (Hungary)`,
                    html: `<b>Dear ${userName}!</b><br><br>Welcome to our online customer portal service!<br><br>Please confirm your email address by clicking on this link: <a href="${process.env.REG_EMAIL_LINK_ACCEPTED}/${registrationToken}">I ACCEPT</a>
        <br><br>Thanks<br><br>If you do not wish to use this service, please click on this link: <a href="${process.env.REG_EMAIL_LINK_DISMISSED}/${registrationToken}">I DISMISS</a><br><br><br>With kind regards:<br>YUSEN (Hungary) Team`,
                };
                break;
        }

        return mailOptions;
    }
};
