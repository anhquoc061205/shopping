import {
  Button,
  Form,
  Image,
  Input,
  InputNumber,
  Modal,
  Popconfirm,
  Table,
  Tag,
} from "antd";
import { useForm } from "antd/es/form/Form";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import api from "../config/api";

function ProductPage() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [data, setData] = useState<any[]>([]); //mảng dữ liệu sản phẩm
  const [form] = useForm();
  const columns: any[] = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Brand",
      dataIndex: "brand",
      key: "brand",
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
    },
    {
      title: "Image",
      dataIndex: "imageUrl",
      key: "imageUrl",
      render: (url: string) => <Image width={100} src={url} />,
    },
    {
      title: "Available",
      dataIndex: "available",
      key: "available",
      render: (available: boolean) =>
        available ? (
          <Tag color="green">In stock</Tag>
        ) : (
          <Tag color="red">Out of stock</Tag>
        ),
    },
    {
      title: "Action",
      dataIndex: "id",
      key: "id",
      render: (id: number) => (
        <>
          <Button>Edit</Button>{" "}
          <Popconfirm
            title="Delete the task"
            description="Are you sure to delete this task?"
            onConfirm={() => handleDelete(id)}
            okText="Yes"
            cancelText="No"
          >
            <Button>Delete</Button>
          </Popconfirm>
        </>
      ),
    },
  ];
  const handleDelete = async () => {
    try{
      const {data} = await api.delete(`product/${id}`);
      toast.success("delete product successfully");
      fetchData();// gọi lại hàm fecth data để cập nhật lại bảng
    }catch(error){
      toast.error("failde to delete product");
    }
  }

  //fetch data từ api
  const fetchData = async () => {
    try {
      const { data } = await api.get("product");
      toast.success("Fetch data successfully");
      setData(data.result); //gán data trả về cho biến data
    } catch (error) {
      toast.error("Failed to fetch data");
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  const handleSubmit = async (value: any) => {
    console.log(value);
    try {
      const { data } = await api.post("product", value);
      toast.success("Create product successfully");
      setIsOpen(false); //đóng modal
      form.resetFields(); //reset form về trạng thái ban đầu
      fetchData(); //gọi lại hàm fetch data để cập nhật lại bảng
    } catch (error) {
      toast.error("Failed to create product");
    }
  };
  return (
    <div>
      <h1 className="text-2xl font-bold">Product dashboard</h1>
      <Button onClick={() => setIsOpen(true)} className="my-3">
        Create product
      </Button>
      <Table columns={columns} dataSource={data} />
      <Modal
        open={isOpen}
        onCancel={() => setIsOpen(false)}
        onOk={() => form.submit()} //khi nhấn oke thì submit form
        title="Create new product"
      >
        <Form
          form={form} // tham chiếu tới cái form ở trên
          layout="vertical"
          onFinish={handleSubmit} // khi submit form thì gọi hàm này
          initialValues={{
            name: "",
            description: "",
            brand: "",
            category: "",
            price: 0,
            imageUrl: "",
          }}
        >
          <Form.Item
            label="Name"
            name="name"
            rules={[{ required: true, message: "Please enter product name" }]}
          >
            <Input placeholder="Enter product name" />
          </Form.Item>

          <Form.Item label="Description" name="description">
            <Input.TextArea rows={3} placeholder="Enter product description" />
          </Form.Item>

          <Form.Item label="Brand" name="brand">
            <Input placeholder="Enter brand" />
          </Form.Item>

          <Form.Item label="Category" name="category">
            <Input placeholder="Enter category" />
          </Form.Item>

          <Form.Item
            label="Price"
            name="price"
            rules={[{ required: true, message: "Please enter price" }]}
          >
            <InputNumber
              min={0}
              style={{ width: "100%" }}
              formatter={(value) => `$ ${value}`}
            />
          </Form.Item>

          <Form.Item label="Image URL" name="imageUrl">
            <Input placeholder="Enter image URL" />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}

export default ProductPage;
