import "./gdpr.css";

export class GDPRConsentComponent {
  
    constructor() { 
    }

    showGDPRConsent() {
        if(document.cookie.toString().search("GDPR-info") == -1){
        import("./gdpr.html").then((popup) => {
            document.getElementsByTagName('gdpr')[0].innerHTML = popup.default;

            let blur_header = document.getElementById("blur-header");
            let blur_body = document.getElementById("blur-body");
            blur_header.className = 'is-blurred';
            blur_body.className = 'is-blurred';

            let modal = document.getElementsByClassName('modal')[0];
            let header_text = document.getElementById("header-text");
       
            let acceptButton = document.getElementById("accept");
            let rejectButton = document.getElementById("reject");
            this._disableScrolling();

            modal.style.display = "block";

            acceptButton.onclick = ()=>{
                modal.style.display = "none";
                this._enableScrolling();
                blur_header.className = '';
                blur_body.className = '';
                this._confirmEvent();

            }
            rejectButton.onclick = () => {
                modal.style.display = "none";
                this._enableScrolling();
                blur_header.className = '';
                blur_body.className = '';
                this._rejectEvent();

            }
            let headerContent = "GDPR Consent";
            header_text.innerHTML = headerContent;
            this._displayVendors();

        });

    }
    }

    _displayVendors() {
        let vendor_list = require('../../resources/vendor-list.json');
        let vendors = vendor_list.vendors;

        for (let i = 0; i < Object.keys(vendors).length; i++) {

            let li = document.createElement('li');
            li.setAttribute('class', 'vendors-elem');

            let span_vendor_name = document.createElement('span');

            span_vendor_name.setAttribute('class', 'vendor-name');
            let link_policy_url = document.createElement('a');

            link_policy_url.setAttribute('class', 'vendor-policy-url');

            let check_box = document.createElement("input");
            check_box.setAttribute("type", "checkbox");
            check_box.setAttribute("class", "vendor-checkbox");


            li.addEventListener("click", () => check_box.checked = !check_box.checked, false);
            check_box.addEventListener("click", () => check_box.checked = !check_box.checked, false);

            if (vendors[i] != undefined) {
                span_vendor_name.innerText = vendors[i].name;
                link_policy_url.innerText = vendors[i].policyUrl;
                link_policy_url.setAttribute("href", vendors[i].policyUrl);
                li.setAttribute("id", vendors[i].id);
                li.append(span_vendor_name);
                li.append(check_box);
                li.append(link_policy_url);
                document.getElementById("vendors-list").append(li);
            }
         

        }
    }

    

    _getVendorsListChecked() {
        let li_elems = document.getElementsByClassName("vendors-elem");
        let vendors_list_checked = new Array();

        for(let i = 0; i < li_elems.length; i++){
            if(li_elems[i].children[1].checked)
            {
                vendors_list_checked.push({
                    "id": li_elems[i].attributes.id.value,
                    "name": li_elems[i].children[0].innerText,

                });
            }    
        }

        return vendors_list_checked;
    }

    _addCookie(key, value, minutes){
        let date = new Date();

    date.setTime(date.getTime()-date.getTimezoneOffset()*60000+(minutes*60*1000));
      document.cookie = `${key}=${value}; expires=${date.toGMTString()}`;
    }

    _confirmEvent() {
    let vendors_list_checked = this._getVendorsListChecked();
       this._addCookie(
           "GDPR-info", 
           JSON.stringify(
           {
               confirmed: true,
               checkedVendors: vendors_list_checked
           }),
           24 * 60);
    }

    _rejectEvent() {
        let vendors_list_checked = this._getVendorsListChecked();
        this._addCookie(
            "GDPR-info", 
            JSON.stringify(
            {
                confirmed: false,
                checkedVendors: vendors_list_checked
            }),
            24 * 60);
    }


    _disableScrolling() {
        let x = window.scrollX;
        let y = window.scrollY;
        window.onscroll = function () {
            window.scrollTo(x, y);
        };
    }

    _enableScrolling() {
        window.onscroll = function () {};
    }

    
}

