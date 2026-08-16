class NuclearModVM {
    constructor() {
        this.targets = [];
        this.variables = new Map();
        this.lists = new Map();
        this.running = false;
    }

    start() {
        this.running = true;
    }

    stop() {
        this.running = false;
    }

    addTarget(target) {
        this.targets.push(target);
    }

    setVariable(name, value) {
        this.variables.set(name, value);
    }

    getVariable(name) {
        return this.variables.get(name);
    }
}

module.exports = NuclearModVM;