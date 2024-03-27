import { OTPInput, SlotProps } from 'input-otp';

import { Button } from 'src/components/ui/button';
import { cn } from 'src/lib/utils';
import { useVerifyEmail } from './useVerifyEmail';
import mainBackground from 'src/assets/images/main.svg';
import { Card } from 'src/components/ui/card';

const VerifyEmail = () => {
  const {
    otp,
    setOtp,
    isSendingVerificationCode,
    isVerifyingEmail,
    showSendButton,
    onComplete,
    sendVerificationCode,
  } = useVerifyEmail();

  return (
    <main className="relative flex min-h-screen w-full items-center justify-center px-5">
      <div className="absolute h-full w-full p-4 [filter:blur(2px)_brightness(0.7)]">
        <img src={mainBackground} alt="" className="h-full w-full" />
      </div>
      <Card className="z-10 flex flex-col gap-8 border-t-4 border-t-primary p-4 pb-6 shadow-2xl md:p-6 md:pb-8">
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
      </Card>
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
