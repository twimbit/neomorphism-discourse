export default {
    name: 'clerk',
    initialize() {


        const frontendApi = 'clerk.climbing.fawn-51.lcl.dev'; // <- Add Frontend API here

        jQuery(document).ready(function ($) {
            const script = document.createElement('script');
            script.setAttribute('data-clerk-frontend-api', frontendApi);
            script.async = true;
            script.src = `https://${frontendApi}/npm/@clerk/clerk-js@2/dist/clerk.browser.js`;
            script.addEventListener('load', startClerk);
            script.addEventListener('error', () => {
                document.getElementById('no-frontend-api-warning').hidden = false;
            });
            document.body.appendChild(script);

        })


        const startClerk = async () => {
            const Clerk = window.Clerk;

            try {
                // Load Clerk environment and session if available
                await Clerk.load();

                $('.d-header-wrap').on('click', '.logout', () => {
                    $.ajax({
                        url: "http://localhost:4343/logout?session=" + Clerk.session.id,
                        type: "get",
                        contentType: "application/json; charset=utf-8",
                        dataType: "json",
                    });
                });

                // Clerk.addListener(({client, user}) => {
                //   if (!user) {
                //     $.ajax({
                //       url: "/clerk",
                //       type: "post",
                //       data: {data_value: JSON.stringify({status: "logout"})}
                //     });
                //   }
                // });

                // if (!Clerk.user) {
                //
                //   //document.location = 'http://localhost:4200';
                // }

            } catch (err) {
                console.error('Error starting Clerk: ', err);
            }
        };
    }
};

