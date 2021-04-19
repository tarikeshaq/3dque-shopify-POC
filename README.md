# POC for 3Dque on setting up webhooks with shopify

## How to set it up:

There are two main pieces to set up the webhooks

1. Run a server that listens on `POST` requests on a specific URL that is publicly accessible
2. Register the URL of the path the server is listening on to Shopify

## Running a server:

For the sake of the proof of concept, there is a very minimal `express` server in `app.js`. To run it, make sure you have `node` and `yarn` installed, then run the following:

```
yarn start
```

which will run the server to listen on your `localhost:3000`

Next, you would want to expose this server publicly. You have two options:

1. Actually deploy this somewhere (and this is what you should do for any production case)
1. Do a workaround for proof-of-concept purposes to expose your forward request on the web to your localhost.

For the sake of the proof-of-concept, we'll go with the later option, and we'll use a really cool tool called `ngrok`, it's a CLI tool that does a lot of cool stuff, including generating URLs that are publicly accessible that can be forwarded to a port on your local machine

Once you have ngrok installed (follow instructions on their website) run:

```
ngrok http 3000
```

Make sure that your server is up and running when you do this. `ngrok` should generate an output that looks something like this:

```
Session Status                online
Session Expires               1 hour, 59 minutes
Update                        update available (version 2.3.39, Ctrl-U to update)
Version                       2.3.35
Region                        United States (us)
Web Interface                 http://127.0.0.1:4040
Forwarding                    http://0e4645162c1e.ngrok.io -> http://localhost:3000
Forwarding                    https://0e4645162c1e.ngrok.io -> http://localhost:3000

Connections                   ttl     opn     rt1     rt5     p50     p90
                              0       0       0.00    0.00    0.00    0.00

```

From here, we can see that `https://0e4645162c1e.ngrok.io` is the link to use, since our server listens on the `/order` path, the link to use would be `https://0e4645162c1e.ngrok.io/order` **NOTE THAT FOR YOU THIS WILL BE A DIFFERENT URL, LOOK AT YOUR NGROK OUTPUT**

## Register the URL in your Shopify store!

This is simple, all you have to do is go the `Settings` of your shopify store, then `Notifications`, then `Webhooks`. From there setup a webhook for the `Create Order` action and input the URL you got from the above instructions there.

## DONE!

You are done, you can test this now by creating an order in your store and marking it as paid to trigger the server!

## DISCLAIMER

This was done as a simple proof of concepts, all the server does is listen for actions and simulate communicating with printers, it's just a bunch of timeouts once the webhook is triggered, in a real implementation, the timeouts would be replaced with real API calls to the printers.

As a second note, one must read more carefully into the Shopify API and handle edge cases and formats, notable things to review:

- Handling if webhooks are triggered twice for the same order (order have an ID, so handling only unique ones is a good idea)
- The format of the data, the details of the order are in an `line_items` array, you need to make sure to read into the documentation to get the full data
