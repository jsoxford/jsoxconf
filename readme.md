# JSOxConf

# HELLO THERE

If you're reading this, **that's AWESOME** - we're not being secretive, we just want to make sure we've got stuff in place before publicly announcing it to everyone.

So, get involved - either chat to Ben Ryan or Pete, or jump on #jsoxconf on the DO slack.

> A day-long, community-focussed event for **everyone** who is excited about javascript and the front-end web.

## Development

(to be improved & automated)

```bash
npm install -g buble live-server

# any time you change logo.js
buble logo.js > logo.dist.js

live-server
```

### Deployment
```bash
# Deployment (requires keys to be set)
aws s3 sync . s3://jsoxconf.com --region eu-west-1 --acl public-read
```
