import ImageWrapper from 'src/components/ImageWrapper';
import { Button } from 'src/components/ui/button';
import { Card } from 'src/components/ui/card';
import { InputOTP, InputOTPGroup, InputOTPSlot } from 'src/components/ui/input-otp';
import { cn } from 'src/lib/utils';
import { useVerifyEmail } from './useVerifyEmail';

const REGEXP_ONLY_DIGITS = '^\\d+$';

const VerifyEmail = () => {
  const {
    otpValue,
    setOtpValue,
    isSendingVerificationCode,
    isVerifyingEmail,
    showSendButton,
    onComplete,
    sendVerificationCode,
  } = useVerifyEmail();

  return (
    <ImageWrapper>
      <Card className="z-10 flex flex-col gap-8 border-t-4 border-t-primary p-4 pb-6 shadow-2xl md:p-6 md:pb-8">
        <header className="flex flex-col gap-2 text-center text-sm md:text-2xl">
          <p>A verification code has been sent to your email address.</p>
          <p>Please check your inbox and enter the code below.</p>
        </header>

        <div className="mx-auto">
          <InputOTP
            maxLength={6}
            pattern={REGEXP_ONLY_DIGITS}
            value={otpValue}
            onChange={setOtpValue}
            disabled={isVerifyingEmail || isSendingVerificationCode}
            onComplete={onComplete}
          >
            <InputOTPGroup>
              <InputOTPSlot className="h-16 w-14 text-xl" index={0} />
              <InputOTPSlot className="h-16 w-14 text-xl" index={1} />
              <InputOTPSlot className="h-16 w-14 text-xl" index={2} />
              <InputOTPSlot className="h-16 w-14 text-xl" index={3} />
              <InputOTPSlot className="h-16 w-14 text-xl" index={4} />
              <InputOTPSlot className="h-16 w-14 text-xl" index={5} />
            </InputOTPGroup>
          </InputOTP>
        </div>

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
    </ImageWrapper>
  );
};

export default VerifyEmail;
