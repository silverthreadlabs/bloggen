"use client";

import { useState } from "react";
import { signIn, client } from "@/lib/auth/auth-client";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
	CardFooter,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { PasswordInput } from "@/components/ui/password-input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

export default function ClientTest() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [loading, setLoading] = useState(false);

	// Get the session data using the useSession hook
	const { data: session, isPending, error } = client.useSession();

	const handleLogin = async () => {
		setLoading(true);
		await signIn.email(
			{
				email,
				password,
				callbackURL: "/client-test",
			},
			{
				onResponse: () => {
					setLoading(false);
				},
				onError: (ctx) => {
					toast.error(ctx.error.message);
				},
				onSuccess: () => {
					toast.success("Successfully logged in!");
					setEmail("");
					setPassword("");
				},
			},
		);
	};

	return (
		<div className="w-full min-h-screen max-w-7xl mx-auto py-10 px-4 sm:px-0 sm:py-16 space-y-8">
			<h1 className="text-2xl font-bold text-center">
				Client Authentication Test
			</h1>

			<div className="grid grid-cols-1 md:grid-cols-2 gap-8">
				{/* Login Form */}
				<Card>
					<CardHeader>
						<CardTitle>Sign In</CardTitle>
						<CardDescription>
							Enter your email and password to sign in
						</CardDescription>
					</CardHeader>
					<CardContent>
						<div className="grid gap-4">
							<div className="grid gap-2">
								<Label htmlFor="email">Email</Label>
								<Input
									id="email"
									type="email"
									placeholder="m@example.com"
									value={email}
									onChange={(e) => setEmail(e.target.value)}
								/>
							</div>
							<div className="grid gap-2">
								<Label htmlFor="password">Password</Label>
								<PasswordInput
									id="password"
									placeholder="••••••••"
									value={password}
									onChange={(e) => setPassword(e.target.value)}
								/>
							</div>
						</div>
					</CardContent>
					<CardFooter>
						<Button
							className="w-full"
							onClick={handleLogin}
							disabled={loading}
							size="default"
							fullWidth
							variant="solid"
							isLoading={loading}
						>
							Sign In
						</Button>
					</CardFooter>
				</Card>

				{/* Session Display */}
				<Card>
					<CardHeader>
						<CardTitle>Session Information</CardTitle>
						<CardDescription>
							{isPending
								? "Loading session..."
								: session
									? "You are currently logged in"
									: "You are not logged in"}
						</CardDescription>
					</CardHeader>
					<CardContent>
						{isPending ? (
							<div className="flex justify-center py-4">
								<Loader2 className="h-8 w-8 animate-spin text-canvas-text" />
							</div>
						) : error ? (
							<div className="p-4 bg-destructive/10 text-alert-text rounded-md">
								Error: {error.message}
							</div>
						) : session ? (
							<div className="space-y-4">
								<div className="flex items-center gap-4">
									{session.user.image ? (
										<img
											src={session.user.image}
											alt="Profile"
											className="h-12 w-12 rounded-full object-cover"
										/>
									) : (
										<div className="h-12 w-12 rounded-full bg-muted flex items-center justify-center">
											<span className="text-lg font-medium">
												{session.user.name?.charAt(0) ||
													session.user.email?.charAt(0)}
											</span>
										</div>
									)}
									<div>
										<p className="font-medium">{session.user.name}</p>
										<p className="text-sm text-canvas-text">
											{session.user.email}
										</p>
									</div>
								</div>

								<div className="rounded-md bg-muted p-4">
									<p className="text-sm font-medium mb-2">Session Details:</p>
									<pre className="text-xs overflow-auto max-h-40">
										{JSON.stringify(session, null, 2)}
									</pre>
								</div>
							</div>
						) : (
							<div className="py-8 text-center text-canvas-text">
								<p>Sign in to view your session information</p>
							</div>
						)}
					</CardContent>
					{session && (
						<CardFooter>
							<Button
								onClick={() =>
									client.signOut({
										fetchOptions: {
											onSuccess: () => {
												toast.success("Successfully signed out!");
											},
										},
									})
								}
								size="default"
								fullWidth
								variant="outline"
							>
								Sign Out
							</Button>
						</CardFooter>
					)}
				</Card>
			</div>
		</div>
	);
}
