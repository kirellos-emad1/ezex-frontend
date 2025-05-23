"use client";

import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { PATHS } from "@/constants/paths.constant";
import { useSigninStore } from "@/stores/signin/signin.store";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { EMAIL_FORM_INITIAL_VALUES } from "../_constants/email-form.constant";
import {
    emailFormSchema,
    EmailFormValues,
} from "../_schemas/email-form.schema";

const EmailForm = () => {
    const router = useRouter();
    const form = useForm<EmailFormValues>({
        resolver: zodResolver(emailFormSchema),
        defaultValues: EMAIL_FORM_INITIAL_VALUES,
    });

    const setEmail = useSigninStore(state => state.setEmail);
    const setPictureName = useSigninStore(state => state.setPictureName);

    const getEmailPictureInfo = useMutation({
        mutationFn: async () => {}, // TODO: add when api is ready
    });

    const onSubmit = form.handleSubmit(values => {
        getEmailPictureInfo.mutate(undefined, {
            onSuccess() {
                setEmail(values.email);
                setPictureName("baseball"); // TODO: change when api is ready
                router.push(PATHS.SigninPasswordPage);
            },
        });
    });

    return (
        <Form {...form}>
            <form className="flex flex-col" onSubmit={onSubmit}>
                <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="mb-4">
                                Enter your Email address
                            </FormLabel>
                            <FormControl>
                                <Input {...field} placeholder="email address" />
                            </FormControl>
                            <FormDescription />
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <Button
                    size="lg"
                    type="submit"
                    color="primary"
                    className="mt-4 lg:mt-8"
                    disabled={getEmailPictureInfo.isPending}
                    isLoading={getEmailPictureInfo.isPending}
                >
                    Continue
                </Button>
            </form>
        </Form>
    );
};

export default EmailForm;
