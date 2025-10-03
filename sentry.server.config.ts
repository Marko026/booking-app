import * as Sentry from '@sentry/nextjs'

Sentry.init({
	dsn: process.env.SENTRY_DSN,
	environment: process.env.NODE_ENV,
	tracesSampleRate: 1.0,
	beforeSend(event, _hint) {
		// Filter PII
		if (event.user) {
			delete event.user.email
			delete event.user.ip_address
		}
		return event
	},
})
