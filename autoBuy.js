//Create emptpy interval vars
var intervalBuildings = null;
var intervalUpgrades = null;
var intervalClot = null;
var intervalSeasons = null;
var intervalSpecial = null;
var intervalPrestige = null;
var intervalReindeer = null;
var intervalGoldenCookie = null;
var intervalDragon = null;
var intervalSanta = null;

//create global functions for common commands
function qs(e) { return document.querySelector(e); }
function gBid(e) { return document.getElementById(e); }
function gBcn(e) { return document.getElementsByClassName(e); }
function gUBid(e) { return "[onclick='Game.UpgradesById[" + e + "].buy();']"; }

//Common interface statics
var tech = gBid("techUpgrades");
var upgrades = gBid("upgrades");
var store = qs("[class='storeSection']");
var options = gBid("prefsButton");
var stats = gBid("statsButton");
var legacy = gBid("legacyButton");
var prestigeNow = 25;
var trackBuy = 0;
var trackBuy10 = 0;
var trackBuy100 = 0;

//Interval manager
function intervalSet(on) {
    if (on) {
        intervalBuildings = setInterval(function () {
            buyBuilding();
        }, 1);
        intervalUpgrades = setInterval(function () {
            buyUpgrades();
        }, 1000);
        intervalClot = setInterval(function () {
            reloadForBadCookie();
        }, 1000);
        intervalSeasons = setInterval(function () {
            seasons();
        }, 1000);
        intervalSpecial = setInterval(function () {
            specialUpgrade();
        }, 1000);
        intervalPrestige = setInterval(function () {
            prestigeWorldWide();
        }, 20000);
        intervalReindeer = setInterval(function () {
            seasonPopup();
        }, 1000);
        intervalGoldenCookie = setInterval(function () {
            goldenCookie();
        }, 1000);

    }
    else {
        clearInterval(intervalBuildings);
        clearInterval(intervalUpgrades);
        clearInterval(intervalClot);
        clearInterval(intervalSeasons);
        clearInterval(intervalSpecial);
        clearInterval(intervalReindeer);
        clearInterval(intervalGoldenCookie);
    }
}

function intervalSetDragon(on) {
    if (on) {
        intervalDragon = setInterval(function () {
            upgradeDragon();
        }, 1);
    }
    else {
        clearInterval(intervalDragon);
    }
}

function intervalSetSanta(on) {
    if (on) {
        intervalSanta = setInterval(function () {
            upgradeSanta();
        }, 1);
    }
    else {
        clearInterval(intervalSanta);
    }
}

//Start the setintervals
intervalSet(true);
intervalSetDragon(true);
intervalSetSanta(true);

//Loop for picking seasons
function seasons() {
    var valentine = Game.Has('Pure heart biscuits') && Game.Has('Ardent heart biscuits') && Game.Has('Sour heart biscuits') && Game.Has('Weeping heart biscuits') && Game.Has('Golden heart biscuits') && Game.Has('Eternal heart biscuits');
    var halloween = Game.Has('Skull cookies') && Game.Has('Ghost cookies') && Game.Has('Bat cookies') && Game.Has('Slime cookies') && Game.Has('Pumpkin cookies') && Game.Has('Eyeball cookies') && Game.Has('Spider cookies');
    var christmas = Game.Has('Christmas tree biscuits') && Game.Has('Snowflake biscuits') && Game.Has('Snowman biscuits') && Game.Has('Holly biscuits') && Game.Has('Candy cane biscuits') && Game.Has('Bell biscuits') && Game.Has('Present biscuits');
    var easter = Game.Has('Chicken egg') && Game.Has('Duck egg') && Game.Has('Turkey egg') && Game.Has('Quail egg') && Game.Has('Robin egg') && Game.Has('Ostrich egg') && Game.Has('Cassowary egg') && Game.Has('Salmon roe') && Game.Has('Frogspawn') && Game.Has('Shark egg') && Game.Has('Turtle egg') && Game.Has('Ant larva') && Game.Has('Golden goose egg') && Game.Has('Faberge egg') && Game.Has('Wrinklerspawn') && Game.Has('Cookie egg') && Game.Has('Omelette') && Game.Has('Century egg') && Game.Has('"egg"') && Game.UpgradesById[227] != null;
    var goldenCookieReload = Game.Has('Lucky day') && Game.Has('Serendipity') && Game.Has('Get lucky');
    var wrinklers = 0;
    var toggle = gBid("toggleUpgrades");
    var valentineButton = toggle.querySelector(gUBid(184));
    var halloweenButton = toggle.querySelector(gUBid(183));
    var christmasButton = toggle.querySelector(gUBid(182));
    var easterButton = toggle.querySelector(gUBid(209));
    for (i = 0; i < 12; i++) {
        if (Game.wrinklers[i].close == 1) {
            wrinklers++;
        }
    }
    if (Game.Has('A festive hat') == false) {
        christmasButton.click();
    }
    else if (valentine == false) {
        valentineButton.click();
    }
    else if (Game.shimmerTypes['golden'].maxTime > 6092) {
        if (goldenCookieReload == true && Game.clickFrenzy == 0 && Game.frenzy == 0) {
            reload();
        }
        christmasButton.click();
    }
    else if (halloween == false && wrinklers == 12) {
        halloweenButton.click();
        for (i = 0; i < 12; i++) {
            Game.wrinklers[i].hp = 0;
        }
    }
    else if (easter == false) {
        easterButton.click();
    }
    else {
        christmasButton.click();
    }
}

//Loop for big cookie clicks
function autoClicker(clicksAtOnce, repeatInterval) {
    var cheated = false;
    var intoTheAbyss = function () {
        if (!cheated) {
            cheated = true;
            for (var i = 0; i < clicksAtOnce; i++) {
                Game.ClickCookie();
                Game.lastClick = 0;
            }
            cheated = false;
        };
    };
    return setInterval(intoTheAbyss, repeatInterval);
};

//Click the big cookie
autoClicker(1000, 1);

//Click the reindeers
function seasonPopup() {
    if (Game.shimmerTypes['reindeer'].spawned > 0) {
        Game.shimmerTypes['reindeer'].click();
        if (Game.frenzy == 666) {
            console.log("Nailed it!");
        }
    }
}

//Click the golden cookies
function goldenCookie() {
    if (Game.shimmerTypes['golden'].spawned > 0) {
        Game.shimmerTypes['golden'].click();
    }
}

//Get dragon upgrades
function upgradeDragon() {
    if (Game.Has('A crumbly egg')) {
        Game.UpgradeDragon();
        var skipDragon = false;
    }
}

//Get santa upgrades
function upgradeSanta() {
    if (Game.Has('A festive hat')) {
        Game.UpgradeSanta();
        var skipSanta = false;
    }
}

//Finish out special upgrades
function specialUpgrade() {
    if (Game.dragonLevel >= 21 && skipDragon != true) {
        Game.dragonAura = 10;
        Game.dragonAura2 = 15;
        intervalSetDragon(false);
        var skipDragon = true;
    }
    if (Game.santaLevel >= 14 && skipSanta != true) {
        intervalSetSanta(false);
        var skipSanta = true;
    }
    else {

    }
}

//Export/import and reload
function reload() {
    var optionsMenu = gBcn("option");
    var lenMenu = optionsMenu.length;
    options.click();
    Game.WriteSave();
    Game.ExportSave();
    var saveData = gBid("textareaPrompt").innerHTML;
    Game.ClosePrompt();
    Game.ImportSave();
    gBid("textareaPrompt").innerHTML = saveData;
    gBid("promptOption0").click();
    gBid("statsButton").click();
}

//Reload for clot
function reloadForBadCookie() {
    if (Game.frenzyPower == 0.5) {
        reload();
        gBid("statsButton").click();
    }
}

//Buy best building
function buyBuilding() {
    var unlocked = store.getElementsByClassName("product unlocked enabled");
    var len = unlocked.length;
    if (qs("[class='storeSection']") == null) {
        gBid("storeBulkBuy").click();
    }
    if (store.querySelector("[style='color: rgb(0, 255, 0);']") == null) {
        unlocked[0].click();
    }
    var buy;
    var buy1 = gBid("storeBulk1");
    var buy10 = gBid("storeBulk10");
    var buy100 = gBid("storeBulk100");
    unlocked = store.getElementsByClassName("product unlocked enabled");
    len = unlocked.length;
    if (trackBuy100 != null) {
        buy100.click();
        unlocked = store.getElementsByClassName("product unlocked enabled");
        len = unlocked.length;
        if (len > 0) {
            for (i = 0; i < len; i++) {
            buy = unlocked[i].querySelector("[style='color: rgb(0, 255, 0);']");
            if (buy != null){
                buy.click();
                trackBuy100 = 0;
            }
            else {
                    trackBuy100++
                    if (trackBuy100 > 200) {
                        trackBuy100 = null
                    }
                }
            }
        }
        else {
            trackBuy100++
            if (trackBuy100 > 200) {
                trackBuy100 = null
            }
        }
    }
    else if (trackBuy10 != null) {
        buy10.click();
        unlocked = store.getElementsByClassName("product unlocked enabled");
        len = unlocked.length;
        if (len > 0) {
            for (i = 0; i < len; i++) {
                buy = unlocked[i].querySelector("[style='color: rgb(0, 255, 0);']");
                if (buy != null){
                    buy.click();
                    trackBuy10 = 0;
                }
                else {
                    trackBuy10++
                    if (trackBuy10 > 500) {
                        trackBuy10 = null
                    }
                }
            }
        }
        else {
            trackBuy10++
            if (trackBuy10 > 500) {
                trackBuy10 = null
            }
        }
    }
    else {
        buy1.click();
        unlocked = store.getElementsByClassName("product unlocked enabled");
        len = unlocked.length;
        if (len > 0) {
            for (var i = 0; i < len; i++) {
            buy = unlocked[i].querySelector("[style='color: rgb(0, 255, 0);']");
                if (buy != null) {
                    buy.click();
                }
            }
        }
    }
}

//Sell for prestige
function sellBuildings() {
    Game.dragonAura = 5;
    gBid("storeBulkSell").click();
    gBid("storeBulkMax").click();
    var storeSell = qs("[class='storeSection selling']");
    var unlocked = storeSell.getElementsByClassName("product unlocked enabled");
    var len = unlocked.length;
    for (var i = 0; i < len - 1; i++) {
        unlocked[i].click();
    }
    if (qs(gUBid("227")) != null) {
        qs(gUBid("227")).click();
    }
}

//Prestige steps
function prestigeMe() {
    intervalSet(false);
    sellBuildings();
    gBid("legacyButton").click();
    gBid("promptOption0").click();
    setTimeout(function () {
        if (gBid("ascendButton") != null) {
            gBid("ascendButton").click();
            gBid("promptOption0").click();
            intervalSet(true);
            intervalSetDragon(true);
            intervalSetSanta(true);
        }
    }, 7000)
}

//Prestige at given %
function prestigeWorldWide() {
    if (gBcn("close menuClose").length < 1) {
        gBid("statsButton").click();
    }
    var findString = document.getElementsByTagName('small');
    var prestigeLen = findString.length;
    for (i = 0; i < prestigeLen; i++) {
        var string = findString[i].innerHTML;
        var split1 = string.split(" ");
        if (split1[2] + " " + split1[3] == "of income)") {
            var split2 = split1[1].split("(");
            var split3 = split2[1].split("%");
            if (split3[0] >= prestigeNow) {
                prestigeMe();
            }
        }
    }
}

//Ids for upgrade skips
var noPurchase = [71,72,73]
var skipLen = noPurchase.length;

//Buy upgrades when they're available
function buyUpgrades() {
    var upgradesList = upgrades.getElementsByClassName("crate upgrade enabled");
    var techList = tech.getElementsByClassName("crate upgrade enabled");
    var upgradesLen = upgradesList.length;
    var techLen = techList.length;
    var techSkip = 0
    if (upgradesLen > 0) {
        for (i = 0; i < upgradesLen; i++) {
            if (upgradesList[i].getAttribute("onclick") == "Game.UpgradesById[227].buy();" == false)
                upgradesList[i].click();
        }
    }
    if (techLen > 0) {
        for (i = 0; i < techLen; i++) {
            for (j = 0; j < skipLen; j++) {
                if ((techList[i].getAttribute("onclick") == "Game.UpgradesById[" + noPurchase[j] + "].buy();") == false) {
                    techSkip++
                }
            }
            if (techSkip == 3) {
                if (techList[i].getAttribute("onclick") == "Game.UpgradesById[69].buy();") {
                    techList[i].click()
                    gBid("promptOption0").click();
                }
                else {
                    techList[i].click();
                }
            }
        }
    }
}