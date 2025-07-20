import { useTranslate } from '@/hooks/common-hooks';
import { IModalProps } from '@/interfaces/common';
import { Form, Input, Modal } from 'antd';

type FieldType = {
  client_id: string;
  client_secret: string;
  subscription_key: string;
  token_url: string;
  base_url: string;
  embedding_base_url: string;
};

interface IJLLGPTBody {
  api_key: string;
  base_url: string;
  llm_factory: string;
}

const JLLGPTModal = ({
  visible,
  hideModal,
  onOk,
  loading,
  llmFactory,
}: IModalProps<IJLLGPTBody> & { llmFactory: string }) => {
  const [form] = Form.useForm<FieldType>();
  const { t } = useTranslate('setting');

  const handleOk = async () => {
    const values = await form.validateFields();

    // Create a JSON string with the M2M credentials for the api_key field
    // This allows the backend to access all necessary M2M authentication parameters
    const credentials = JSON.stringify({
      client_id: values.client_id,
      client_secret: values.client_secret,
      subscription_key: values.subscription_key,
      token_url: values.token_url,
      base_url: values.base_url,
      embedding_base_url: values.embedding_base_url,
    });

    const data: IJLLGPTBody = {
      api_key: credentials,
      base_url: values.base_url,
      llm_factory: llmFactory,
    };

    onOk?.(data);
  };

  const handleKeyDown = async (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      await handleOk();
    }
  };

  return (
    <Modal
      title={t('modify')}
      open={visible}
      onOk={handleOk}
      onCancel={hideModal}
      okButtonProps={{ loading }}
      confirmLoading={loading}
      width={600}
    >
      <Form
        name="jll-gpt-form"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 600 }}
        autoComplete="off"
        form={form}
        layout="horizontal"
      >
        <Form.Item<FieldType>
          label="Client ID"
          name="client_id"
          rules={[
            {
              required: true,
              message: 'Please input your M2M Client ID!',
            },
          ]}
        >
          <Input placeholder="Your M2M Client ID" onKeyDown={handleKeyDown} />
        </Form.Item>

        <Form.Item<FieldType>
          label="Client Secret"
          name="client_secret"
          rules={[
            {
              required: true,
              message: 'Please input your M2M Client Secret!',
            },
          ]}
        >
          <Input.Password
            placeholder="Your M2M Client Secret"
            onKeyDown={handleKeyDown}
          />
        </Form.Item>

        <Form.Item<FieldType>
          label="Subscription Key"
          name="subscription_key"
          rules={[
            { required: true, message: 'Please input your Subscription Key!' },
          ]}
        >
          <Input
            placeholder="Your API Subscription Key"
            onKeyDown={handleKeyDown}
          />
        </Form.Item>

        <Form.Item<FieldType>
          label="Token URL"
          name="token_url"
          rules={[
            { required: true, message: 'Please input your M2M Token URL!' },
          ]}
        >
          <Input
            placeholder="https://your-auth-server/oauth/token"
            onKeyDown={handleKeyDown}
          />
        </Form.Item>

        <Form.Item<FieldType>
          label="Chat/GPT Base URL"
          name="base_url"
          rules={[
            { required: true, message: 'Please input your Chat/GPT Base URL!' },
          ]}
        >
          <Input
            placeholder="https://api.jll-gpt.com/v1"
            onKeyDown={handleKeyDown}
          />
        </Form.Item>

        <Form.Item<FieldType>
          label="Embedding Base URL"
          name="embedding_base_url"
          rules={[
            {
              required: true,
              message: 'Please input your Embedding Base URL!',
            },
          ]}
        >
          <Input
            placeholder="https://embeddings.jll-gpt.com/v1"
            onKeyDown={handleKeyDown}
          />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default JLLGPTModal;
