import { useId, useState } from 'react';

import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { client } from '@/lib/auth/auth-client';
import { cn } from '@/lib/utils';

import { ArrowUpFromLine, Building, CreditCard, Crown, RefreshCcw, Zap } from 'lucide-react';
import { toast } from 'sonner';

function Component(props: { currentPlan?: string; isTrial?: boolean }) {
    const [selectedPlan, setSelectedPlan] = useState('starter');
    const id = useId();

    const plans = [
        {
            id: 'starter',
            name: 'Starter',
            price: '$50/month',
            icon: Zap,
            description: 'Perfect for individuals and small teams',
            features: ['Up to 5 team members', 'Basic analytics', 'Email support']
        },
        {
            id: 'professional',
            name: 'Professional',
            price: '$99/month',
            icon: Crown,
            description: 'Ideal for growing businesses',
            features: ['Up to 25 team members', 'Advanced analytics', 'Priority support', 'Custom integrations']
        },
        {
            id: 'enterprise',
            name: 'Enterprise',
            price: 'Contact sales',
            icon: Building,
            description: 'For large organizations',
            features: ['Unlimited team members', 'Custom solutions', 'Dedicated support', 'SLA guarantee']
        }
    ];

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button
                    variant={!props.currentPlan ? 'solid' : 'outline'}
                    size='sm'
                    className={cn(
                        'gap-2',
                        !props.currentPlan
                            ? 'from-primary-solid to-primary-solid-hover text-primary-on-primary hover:from-primary-solid-hover hover:to-primary-solid bg-gradient-to-r duration-300'
                            : 'border-primary-border text-primary-text hover:bg-primary-bg duration-300'
                    )}>
                    {props.currentPlan ? (
                        <RefreshCcw className='opacity-80' size={14} strokeWidth={2} />
                    ) : (
                        <ArrowUpFromLine className='opacity-80' size={14} strokeWidth={2} />
                    )}
                    {props.currentPlan ? 'Change Plan' : 'Upgrade Plan'}
                </Button>
            </DialogTrigger>
            <DialogContent className='max-w-2xl'>
                <div className='mb-6 flex flex-col gap-3'>
                    <div
                        className='bg-primary-bg border-primary-border flex size-12 shrink-0 items-center justify-center rounded-sm border'
                        aria-hidden='true'>
                        {props.currentPlan ? (
                            <RefreshCcw className='text-primary-solid' size={20} strokeWidth={2} />
                        ) : (
                            <CreditCard className='text-primary-solid' size={20} strokeWidth={2} />
                        )}
                    </div>
                    <DialogHeader>
                        <DialogTitle className='text-left text-xl'>
                            {!props.currentPlan ? 'Upgrade' : 'Change'} your plan
                        </DialogTitle>
                        <DialogDescription className='text-canvas-text text-left'>
                            Choose the perfect plan for your needs. All plans include a 14-day free trial.
                        </DialogDescription>
                    </DialogHeader>
                </div>

                <form className='space-y-6'>
                    <RadioGroup
                        className='grid gap-4'
                        defaultValue='starter'
                        value={selectedPlan}
                        onValueChange={(value) => setSelectedPlan(value)}>
                        {plans.map((plan) => {
                            const Icon = plan.icon;
                            const isSelected = selectedPlan === plan.id;
                            const isCurrentPlan = props.currentPlan?.toLowerCase() === plan.id;

                            return (
                                <div
                                    key={plan.id}
                                    className={cn(
                                        'relative flex w-full items-start gap-4 rounded-sm border p-4 transition-all',
                                        isSelected
                                            ? 'border-primary-border bg-primary-bg shadow-sm'
                                            : 'border-canvas-border bg-canvas-bg hover:border-canvas-border-hover hover:bg-canvas-bg-hover'
                                    )}>
                                    <RadioGroupItem value={plan.id} id={`${id}-${plan.id}`} className='mt-1' />
                                    <div className='flex-1 space-y-2'>
                                        <div className='flex items-center gap-3'>
                                            <div
                                                className={cn(
                                                    'flex size-8 items-center justify-center rounded-sm',
                                                    isSelected
                                                        ? 'bg-primary-solid text-primary-on-primary'
                                                        : 'bg-canvas-bg-active text-canvas-text'
                                                )}>
                                                <Icon size={16} />
                                            </div>
                                            <div className='flex-1'>
                                                <Label
                                                    htmlFor={`${id}-${plan.id}`}
                                                    className='text-canvas-text-contrast text-base font-semibold'>
                                                    {plan.name}
                                                    {isCurrentPlan && (
                                                        <span className='bg-success-bg text-success-text ml-2 rounded-full px-2 py-1 text-xs'>
                                                            Current
                                                        </span>
                                                    )}
                                                </Label>
                                                <p className='text-canvas-text text-sm'>{plan.description}</p>
                                            </div>
                                            <div className='text-right'>
                                                <p className='text-canvas-text-contrast font-semibold'>{plan.price}</p>
                                            </div>
                                        </div>
                                        <ul className='ml-11 space-y-1'>
                                            {plan.features.map((feature, index) => (
                                                <li
                                                    key={index}
                                                    className='text-canvas-text flex items-center gap-2 text-sm'>
                                                    <div className='bg-success-solid size-1 rounded-full' />
                                                    {feature}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            );
                        })}
                    </RadioGroup>

                    <div className='border-warning-border bg-warning-bg rounded-sm border p-3'>
                        <p className='text-warning-text text-center text-xs'>
                            Note: All plan changes take effect immediately. You'll be charged the new amount on your
                            next billing cycle.
                        </p>
                    </div>

                    <div className='grid gap-3'>
                        <Button
                            type='button'
                            className='bg-primary-solid text-primary-on-primary hover:bg-primary-solid-hover w-full'
                            disabled={selectedPlan === props.currentPlan?.toLowerCase() && !props.isTrial}
                            onClick={async () => {
                                if (selectedPlan === 'enterprise') {
                                    // Handle enterprise contact
                                    toast.info('Please contact our sales team for enterprise pricing');

                                    return;
                                }
                                await client.subscription.upgrade(
                                    {
                                        plan: selectedPlan
                                    },
                                    {
                                        onError: (ctx) => {
                                            toast.error(ctx.error.message);
                                        },
                                        onSuccess: () => {
                                            toast.success('Plan updated successfully!');
                                        }
                                    }
                                );
                            }}>
                            {selectedPlan === props.currentPlan?.toLowerCase()
                                ? props.isTrial
                                    ? 'Upgrade Now'
                                    : 'Current Plan'
                                : selectedPlan === 'starter'
                                  ? !props.currentPlan
                                      ? 'Start Free Trial'
                                      : 'Downgrade'
                                  : selectedPlan === 'professional'
                                    ? 'Upgrade to Professional'
                                    : 'Contact Sales'}
                        </Button>
                        {props.currentPlan && (
                            <Button
                                type='button'
                                variant='outline'
                                className='border-alert-border text-alert-text hover:bg-alert-bg w-full'
                                onClick={async () => {
                                    await client.subscription.cancel(
                                        {
                                            returnUrl: '/settings'
                                        },
                                        {
                                            onError: (ctx) => {
                                                toast.error(ctx.error.message);
                                            },
                                            onSuccess: () => {
                                                toast.success('Subscription cancelled successfully');
                                            }
                                        }
                                    );
                                }}>
                                Cancel Subscription
                            </Button>
                        )}
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
}

export { Component };
