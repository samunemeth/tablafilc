module.exports = {
    //simple get
    get: function(url) {
        //get json reply
        let get;
        try {
            get = fetch(url).json();
        } catch (e) {
            console.error(e);
            return false;
        }
        
        //check for error message
        if (get.error) {
            console.error(get.error);
            return false;
        }

        //return reply
        return get;
    },

    //advanced get
    getKey: function(url, key) {
        //get reply as json
        let get;
        try {
            get = fetch(url, { headers: { 'apiKey': key } } ).json();
        } catch (e) {
            console.error(e);
            return false;
        }

        //check for error message
        if (get.error) {
            console.error(get.error);
            return false;
        }

        //return reply
        return get;
    },

    //get with token
    getToken: function(url, token) {
        //get reply as json
        let get;
        try {
            get = fetch(url, {
                headers: {
                    'Authorization': `Bearer ${token.access_token}`,
                    'User-Agent': 'hu.ekreta.student/1.0.5/Android/0/0'
                }
            }).json();
        } catch (e) {
            console.error(e);
            return false;
        }

        //check for error message
        if (get.error) {
            console.error(get.error);
            return false;
        }

        //return reply
        return get;
    },

    //set
    set: function(url, body) {
        //get a json reply
        let get;
        try {
            get = fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'User-Agent': 'hu.ekreta.student/1.0.5/Android/0/0'
                },
                body: body
            }).json();
        } catch (e) {
            console.error(e);
            return false;
        }

        //check for error message
        if (get.error) {
            console.error(get.error);
            return false;
        }

        //return reply
        return get;
    },

    //initialize the api
    init: function() {
        //get all the needed links
        let get = this.get('http://kretamobile.blob.core.windows.net/configuration/ConfigurationDescriptor.json');
        this.links = {
            PROD: get.GlobalMobileApiUrlPROD,
            IDP: 'https://idp.e-kreta.hu',
        }
        
        //set static keys
        this.keys = {
            general: '7856d350-1fda-45f5-822d-e1a2f3f1acf0',
        }
    },

    //get institutes
    institutes: function() {
        let get = this.getKey(`${this.links.PROD}:443/api/v2/Institute`, this.keys.general);
        return get;
    },

    //get token
    token: function(credentials) {
        //get
        let get = this.set(`${this.links.IDP}/connect/token`, `userName=${credentials.username}&password=${credentials.password}&institute_code=${credentials.institute}&grant_type=password&client_id=kreta-ellenorzo-mobile`);

        //check for error
        if (!get) {
            console.error('Invalid password or username!');
            return false;
        }

        //create token object
        let token = {
            access_token: get.access_token,
            refresh_token: get.refresh_token,
            institute: credentials.institute,
        }

        //return
        return token;
    },

    //get Evaluations
    evaluations: function(token) {
        //get
        let get = this.getToken(`https://${token.institute}.ekreta.hu/ellenorzo/V3/Sajat/Ertekelesek`, token);

        //check for error
        if (!get) {
            console.error('Error while getting data!');
            return false;
        }

        //return
        return get;
    },

    //get Timetable
    timetable: function(token, weekOff) {
        //get
        let get = this.getToken(`https://${token.institute}.ekreta.hu/ellenorzo/V3/Sajat/OrarendElemek?datumTol=2020-09-01T00-00-00&datumIg=2020-09-08T00-00-00`, token);

        //check for error
        if (!get) {
            console.error('Error while getting data!');
            return false;
        }

        //return
        return get;
    },
}