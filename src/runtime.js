class Runtime {
    constructor(vm) {
        this.vm = vm;
        this.tasks = [];
        this.running = false;
    }

    start() {
        if (this.running) return;

        this.running = true;
        this.tick();
    }

    stop() {
        this.running = false;
    }

    addTask(task) {
        if (typeof task !== 'function') {
            throw new TypeError('Task must be a function.');
        }

        this.tasks.push(task);
    }

    tick() {
        if (!this.running) return;

        const tasks = this.tasks.splice(0);

        for (const task of tasks) {
            task(this.vm);
        }

        setImmediate(() => this.tick());
    }
}

module.exports = Runtime;