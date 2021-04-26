(function () {

    this.control = rjs.Script("ship/control.js");
    this.control();

    this.HP.filters[0] = this.HP_BG.filters[0] = rgb(255, 0, 0);

})