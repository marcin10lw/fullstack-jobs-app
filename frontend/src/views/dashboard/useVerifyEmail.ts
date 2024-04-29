import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { useState } from 'react';

import { useToast } from 'src/components/ui/use-toast';
import { authAPI } from 'src/api/auth/authApiAdapter';
import { CURRENT_USER_QUERY_KEY } from 'src/api/user/constants';

export const useVerifyEmail = () => {
  const [otpValue, setOtpValue] = useState('');
  const [showSendButton, setShowSendButton] = useState(false);

  const qc = useQueryClient();
  const { toast } = useToast();

  const { mutate: verifyEmail, isLoading: isVerifyingEmail } = useMutation({
    mutationFn: authAPI.verifyEmail,
    onSuccess: () => {
      setShowSendButton(false);
      setOtpValue('');
      toast({
        title: 'Email verified successfully',
        variant: 'success',
      });
      qc.invalidateQueries([CURRENT_USER_QUERY_KEY]);
    },
    onError: (error) => {
      if (error instanceof AxiosError) {
        if (error.response?.data.msg === 'Verification code expired') {
          setShowSendButton(true);
          toast({
            title: error.response?.data.msg,
            description: 'Send new verification code and try again',
            variant: 'destructive',
          });
          return;
        }

        toast({
          title: error.response?.data.msg ?? 'Something went wrong',
          variant: 'destructive',
        });
      }
    },
  });

  const { mutate: sendVerificationCode, isLoading: isSendingVerificationCode } = useMutation({
    mutationFn: authAPI.sendVerificationCode,
    onSuccess: () => {
      setOtpValue('');
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
    verifyEmail(otpValue);
  };

  return {
    otpValue,
    setOtpValue,
    isVerifyingEmail,
    isSendingVerificationCode,
    showSendButton,
    sendVerificationCode,
    onComplete,
  };
};
