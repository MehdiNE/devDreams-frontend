interface ErrorItems {
  location: string;
  msg: string;
  path: string;
  type: string;
}

interface FormState {
  zodErrors?: {
    [key: string]: string;
  };
  Errors?: ErrorItems[];
}

export default function inputError(field: string, formState: FormState) {
  if (formState?.zodErrors) return formState?.zodErrors?.[field];

  const Errors: ErrorItems[] | undefined = formState?.Errors;

  const err = Errors?.find((item) => item.path === field);
  return err?.msg;
}
