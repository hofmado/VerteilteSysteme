import Page from "../page.js";
import HtmlTemplate from ".../src/static/index.html"

export default class Index extends Page {

    constructor(app){
        super(app, HtmlTemplate);
    }

    async init(){
        await super.init();
        this._title = "Login";
    }
}

this._dataset ={
    
}