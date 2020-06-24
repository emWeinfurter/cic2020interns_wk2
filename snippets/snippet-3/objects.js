class Detail {
    constructor() {
        this.stateAbbr = '';
        this.stateName = '';
        this.totalCases = 0;
        this.totalDeath = 0;
        this.casesInLast7Days = 0;
        this.ratePer100K = 0;
    }

    get avgCasesPerDay() {
        return Math.trunc(this.casesInLast7Days / 7);
    }
}

module.exports = Detail;
