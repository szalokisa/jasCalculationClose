import axios from 'axios';

export default class ListviewCalculations {
    constructor() {
        this.token;
    }

    async tokenGet() {
        const result = await axios.get(`${process.env.CUSTOMERPORTAL_BACKEND}/token`, {
            headers: {
                portalownersid: process.env.PORTAL_OWNERS_ID,
                email: process.env.CUSTOMERPORTAL_LOGIN,
                password: process.env.CUSTOMERPORTAL_PASS,
            }
        })

        this.token = result.data.token;

        return this.token;
    }

    async getRegistrationToken(user) {
        await this.tokenGet();

        const result = await axios.get(`${process.env.CUSTOMERPORTAL_BACKEND}/token/registration`, {
            headers: {
                'x-token': this.token,
                'x-userid': user.ID,
            }
        })

        return result.data.token;
    }

    async getData(props) {
        await this.tokenGet();

        return await axios.get(`${process.env.CUSTOMERPORTAL_BACKEND}/data`, {
            headers: {
                'x-token': this.token,
                'x-collection': props.headers['x-collection'],
                'x-limit': props.headers['x-limit'],
                'x-filter': props.headers['x-filter'],
                'x-sort': props.headers['x-sort'],
                'x-language': props.headers['x-language'],
                'x-pageno': props.headers['x-pageno'],
                'x-rowperpage': props.headers['x-rowperpage'],
            }
        })
    }

    async upsertRecords(props) {
        await this.tokenGet();
        return await axios.put(`${process.env.CUSTOMERPORTAL_BACKEND}/data`,
            {
                collection: props.collection,
                data: props.data,
            },
            {
                headers: {
                    'x-token': this.token,
                },
            }).catch((err) => {
                const error = new Error(err?.response?.data?.message);
                error.status = err?.response?.status || 500
                throw error
            })
    }


}
