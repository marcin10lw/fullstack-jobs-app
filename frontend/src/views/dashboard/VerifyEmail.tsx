import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { OTPInput, SlotProps } from 'input-otp';
import { useState } from 'react';

import { Button } from 'src/components/ui/button';
import { useToast } from 'src/components/ui/use-toast';
import { authAPI } from 'src/infrasctucture/auth/authApiAdapter';
import { CURRENT_USER_QUERY_KEY } from 'src/infrasctucture/user/constants';
import { cn } from 'src/lib/utils';

const VerifyEmail = () => {
  const [otp, setOtp] = useState('');
  const [showSendButton, setShowSendButton] = useState(false);

  const qc = useQueryClient();
  const { toast } = useToast();

  const { mutate: verifyEmail, isLoading: isVerifyingEmail } = useMutation({
    mutationFn: authAPI.verifyEmail,
    onSuccess: () => {
      setShowSendButton(false);
      setOtp('');
      toast({
        title: 'Email verified successfully',
        variant: 'success',
      });
      qc.invalidateQueries([CURRENT_USER_QUERY_KEY]);
    },
    onError: (error) => {
      if (
        error instanceof AxiosError &&
        error.response?.data.msg === 'Verification code expired'
      ) {
        setShowSendButton(true);
        toast({
          title: error.response?.data.msg,
          description: 'Send new verification code and try again',
          variant: 'destructive',
        });
      }
    },
  });

  const { mutate: sendVerificationCode, isLoading: isSendingVerificationCode } =
    useMutation({
      mutationFn: authAPI.sendVerificationCode,
      onSuccess: () => {
        setOtp('');
        setShowSendButton(false);
        toast({
          title: 'New verification code was sent',
          variant: 'success',
        });
      },
      onError: () => {
        toast({
          title: 'Something went wrong',
          description: 'Please try again',
          variant: 'destructive',
        });
      },
    });

  const onComplete = () => {
    verifyEmail(otp);
  };

  return (
    <main className="flex min-h-screen w-full items-center justify-center px-5">
      <section className="flex flex-col gap-8">
        <header className="flex flex-col gap-2 text-center text-sm md:text-2xl">
          <p>A verification code has been sent to your email address.</p>
          <p>Please check your inbox and enter the code below.</p>
        </header>

        <OTPInput
          value={otp}
          onChange={setOtp}
          disabled={isVerifyingEmail || isSendingVerificationCode}
          maxLength={6}
          onComplete={onComplete}
          render={({ slots }) => (
            <div
              className={cn('flex justify-center', {
                'animate-pulse': isVerifyingEmail,
              })}
            >
              {slots.map((slot, idx) => (
                <Slot key={idx} {...slot} />
              ))}
            </div>
          )}
        />

        {showSendButton && (
          <Button
            onClick={() => sendVerificationCode()}
            disabled={isSendingVerificationCode}
            variant="link"
            className={cn('mx-auto w-fit', {
              'animate-pulse': isSendingVerificationCode,
            })}
          >
            Send verification code
          </Button>
        )}
      </section>
    </main>
  );
};

export default VerifyEmail;

function Slot(props: SlotProps) {
  return (
    <div
      className={cn(
        'relative h-16 w-12 text-[2rem] md:h-24 md:w-16',
        'flex items-center justify-center',
        'transition-all duration-100',
        'border-y border-r border-border first:rounded-l-md first:border-l last:rounded-r-md',
        'group-focus-within:border-accent-foreground/20 group-hover:border-accent-foreground/20',
        'outline outline-0 outline-accent-foreground/20',
        { 'outline-4 outline-accent-foreground': props.isActive },
      )}
    >
      {props.char !== null && <div>{props.char}</div>}
      {props.hasFakeCaret && <FakeCaret />}
    </div>
  );
}

function FakeCaret() {
  return (
    <div className="animate-caret-blink pointer-events-none absolute inset-0 flex items-center justify-center">
      <div className="h-8 w-px bg-white" />
    </div>
  );
}
