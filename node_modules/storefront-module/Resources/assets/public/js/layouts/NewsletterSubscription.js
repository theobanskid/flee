Alpine.data("NewsletterSubscription", () => ({
    email: "",
    subscribing: false,

    subscribe() {
        if (!this.email || this.subscribing) {
            return;
        }

        this.subscribing = true;

        axios
            .post(route("subscribers.store"), {
                email: this.email,
            })
            .then(() => {
                this.email = "";
            })
            .catch((error) => {
                if (error.response.status === 422) {
                    notify(error.response.data.errors.email[0]);

                    return;
                }

                notify(error.response.data.message);
            })
            .finally(() => {
                this.subscribing = false;
            });
    },
}));
