import { Button, Form, Input, Switch, Typography } from 'antd';
import { DEMO_ADMIN_PASSWORD, DEMO_ADMIN_USERNAME } from '../auth/demoAuth';

export type SignInValues = {
  username: string;
  password: string;
  remember: boolean;
};

type SignInProps = {
  onSubmit?: (values: SignInValues) => void | Promise<void>;
  loading?: boolean;
};

const SignIn = ({ onSubmit, loading }: SignInProps) => {
  const [form] = Form.useForm<SignInValues>();

  return (
    <div className="w-full max-w-[353px]">
      <div>
        <Typography.Title level={2} className="!text-[#5B2D91]">
          Մուտք
        </Typography.Title>
        <Typography.Text type="secondary">
          Մուտք գործեք ձեր հաշվի միջոցով
        </Typography.Text>
      </div>

      <Form<SignInValues>
        form={form}
        layout="vertical"
        className=""
        initialValues={{
          remember: true,
          username: DEMO_ADMIN_USERNAME,
          password: DEMO_ADMIN_PASSWORD,
        }}
        onFinish={async (values) => {
          await onSubmit?.(values);
        }}
        requiredMark={false}
      >
        <Form.Item
          label="Մուտքանուն"
          name="username"
          rules={[{ required: true, message: 'Լրացրեք մուտքանունը' }]}  
          className=""
        >
          <Input
            size="large"
            autoComplete="username"
            styles={{
              root: { height: 50, borderRadius: 10 },
              input: { height: 50 },
            }}
          />
        </Form.Item>

        <Form.Item
          label="Գաղտնաբառ"
          name="password"
          rules={[{ required: true, message: 'Լրացրեք գաղտնաբառը' }]}
          className=""
        >
          <Input.Password
            size="large"
            autoComplete="current-password"
            styles={{
              root: { height: 50, borderRadius: 10 },
              input: { height: 50 },
            }}
          />
        </Form.Item>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-[10px]">
            <Form.Item name="remember" valuePropName="checked" noStyle>
              <Switch />
            </Form.Item>
            <span className="text-sm text-slate-600">Հիշել ինձ</span>
          </div>
        </div>

        <Button
          type="primary"
          size="large"
          htmlType="submit"
          loading={loading}
          className="w-full !h-[45px] !rounded-[10px] !text-[10px]"
        >
          ՄՈՒՏՔ
        </Button>
      </Form>
    </div>
  );
}

export default SignIn

