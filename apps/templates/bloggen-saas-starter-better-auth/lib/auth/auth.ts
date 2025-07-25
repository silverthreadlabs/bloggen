	import { betterAuth } from "better-auth";
	import {
		bearer,
		admin,
		multiSession,
		organization,
		twoFactor,
		oneTap,
		oAuthProxy,
		openAPI,
		customSession,
		// mcp,
	} from "better-auth/plugins";
	import { reactInvitationEmail } from "./email/invitation";
	// import { LibsqlDialect } from "@libsql/kysely-libsql";
	import { reactResetPasswordEmail } from "./email/reset-password";
	import { resend } from "./email/resend";
	// import { MysqlDialect } from "kysely";
	// import { createPool } from "mysql2/promise";
	import { nextCookies } from "better-auth/next-js";
	import { passkey } from "better-auth/plugins/passkey";
	import { stripe } from "@better-auth/stripe";
	import { Stripe } from "stripe";
	// import Database from "better-sqlite3";
	import { Pool } from "pg";


	const from = process.env.BETTER_AUTH_EMAIL || "delivered@resend.dev";
	const to = process.env.TEST_EMAIL || "";

	// const libsql = new LibsqlDialect({
	// 	url: process.env.TURSO_DATABASE_URL || "",
	// 	authToken: process.env.TURSO_AUTH_TOKEN || "",
	// });

	// const mysql = process.env.USE_MYSQL
	// 	? new MysqlDialect(createPool(process.env.MYSQL_DATABASE_URL || ""))
	// 	: null;

	// const dialect = process.env.USE_MYSQL ? mysql : libsql;

	// if (!dialect) {
	// 	throw new Error("No dialect found");
	// }

	const PROFESSION_PRICE_ID = {
		default: "price_1QxWZ5LUjnrYIrml5Dnwnl0X",
		annual: "price_1QxWZTLUjnrYIrmlyJYpwyhz",
	};
	const STARTER_PRICE_ID = {
		default: "price_1QxWWtLUjnrYIrmleljPKszG",
		annual: "price_1QxWYqLUjnrYIrmlonqPThVF",
	};

	export const auth = betterAuth({
		appName: "Better Auth Demo",
		database: new Pool({
			connectionString: `${process.env.DB_CONNECTION_STRING}`

		  }),
		emailVerification: {
			async sendVerificationEmail({ user, url }) {
				const res = await resend.emails.send({
					from,
					to: to || user.email,
					subject: "Verify your email address",
					html: `<a href="${url}">Verify your email address</a>`,
				});
				console.log(res, user.email);
			},
		},
		account: {
			accountLinking: {
				trustedProviders: ["google", "github", "demo-app"],
			},
		},
		emailAndPassword: {
			enabled: true,
			async sendResetPassword({ user, url }) {
				await resend.emails.send({
					from,
					to: user.email,
					subject: "Reset your password",
					react: reactResetPasswordEmail({
						username: user.email,
						resetLink: url,
					}),
				});
			},
		},
		socialProviders: {
	
			github: {
				clientId: process.env.GITHUB_CLIENT_ID || "",
				clientSecret: process.env.GITHUB_CLIENT_SECRET || "",
			},
			google: {
				clientId: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || "",
				clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
			}
		},
		plugins: [
			// mcp({
			// 	loginPage: "/sign-in",
			// }),
			organization({
				async sendInvitationEmail(data) {
					await resend.emails.send({
						from,
						to: data.email,
						subject: "You've been invited to join an organization",
						react: reactInvitationEmail({
							username: data.email,
							invitedByUsername: data.inviter.user.name,
							invitedByEmail: data.inviter.user.email,
							teamName: data.organization.name,
							inviteLink:
								process.env.NODE_ENV === "development"
									? `http://localhost:3000/accept-invitation/${data.id}`
									: `${
											process.env.BETTER_AUTH_URL ||
											"https://demo.better-auth.com"
										}/accept-invitation/${data.id}`,
						}),
					});
				},
			}),
			twoFactor({
				otpOptions: {
					async sendOTP({ user, otp }) {
						await resend.emails.send({
							from,
							to: user.email,
							subject: "Your OTP",
							html: `Your OTP is ${otp}`,
						});
					},
				},
			}),
			passkey(),
			openAPI(),
			bearer(),
			admin({
				adminUserIds: ["EXD5zjob2SD6CBWcEQ6OpLRHcyoUbnaB"],
			}),
			multiSession(),
			oAuthProxy(),
			nextCookies(),

			oneTap(),
			customSession(async (session) => {
				return {
					...session,
					user: {
						...session.user,
						dd: "test",
					},
				};
			}),
			stripe({
				stripeClient: new Stripe(process.env.STRIPE_KEY || "sk_test_"),
				stripeWebhookSecret: process.env.STRIPE_WEBHOOK_SECRET!,
				subscription: {
					enabled: true,
					plans: [
						{
							name: "Starter",
							priceId: STARTER_PRICE_ID.default,
							annualDiscountPriceId: STARTER_PRICE_ID.annual,
							freeTrial: {
								days: 7,
							},
						},
						{
							name: "Professional",
							priceId: PROFESSION_PRICE_ID.default,
							annualDiscountPriceId: PROFESSION_PRICE_ID.annual,
						},
						{
							name: "Enterprise",
						},
					],
				},
			}),
		],
		trustedOrigins: ["exp://"],
	});
