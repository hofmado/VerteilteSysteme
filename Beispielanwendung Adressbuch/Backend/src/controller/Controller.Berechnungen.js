//Hier get und put beschreiben

//Von root.controller erben lassen
const parent = require('./root.controller');
import 

module.exports{

    ;

    /**
    * GET /address
    * Adressen suchen
    */
async search(req, res, next) {
    // Aufruf der Serviceklasse
    let result = await this._service.search(req.query);

    // HTTP-Antwort generieren
    result.forEach(entity => this._insertHateoasLinks(entity));
    res.sendResult(result);
    return next();
}