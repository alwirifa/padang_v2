"use client";

import { useForm } from "react-hook-form";
import axios from "axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog";
import { z } from "zod";
import UserTable from "@/components/dashboard/user/table";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  SelectValue,
  SelectTrigger,
  SelectContent,
  SelectItem,
  Select,
} from "@/components/ui/select";
import { toast } from "react-hot-toast";

interface User {
  id: number;
  nama: string;
  username: string;
  password: string;
  role: string;
}

const formSchema = z.object({
  name: z.string().optional(),
  username: z.string().optional(),
  password: z.string().optional(),
  role: z.number(),
});

const UsersPage: React.FC = () => {
  const [user, setUser] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: selectedUser?.nama || "",
      username: selectedUser?.username || "",
      password: selectedUser?.password || "",
      role: selectedUser?.role === "admin" ? 1 : 2 || 0,
    },
  });

  useEffect(() => {
    if (selectedUser) {
      form.reset({
        name: selectedUser.nama,
        username: selectedUser.username,
        password: selectedUser.password,
        role: selectedUser.role === "admin" ? 1 : 2,
      });
    }
  }, [selectedUser]);

  const fetchBarang = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BASE_URL}/admin/user`,

        {
          headers: {
            Authorization: `Bearer ${token}`,
            "ngrok-skip-browser-warning": "69420",
          },
        }
      );
      if (response.status === 200) {
        console.log("Response data from fetchBarang:", response.data.data);
        setUser(response.data.data);
      } else {
        console.error("Unexpected status code:", response.status);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchBarang();
  }, []);

  const handleDelete = async (id: number) => {
    const token = localStorage.getItem("token");

    const deletePromise = axios.delete(
      `${process.env.NEXT_PUBLIC_BASE_URL}/admin/user?id=${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "ngrok-skip-browser-warning": "69420",
        },
      }
    );

    toast.promise(deletePromise, {
      loading: "Deleting user...",
      success: "User deleted successfully!",
      error: "Failed to delete user. Please try again.",
    });

    try {
      await deletePromise;
      toast.success("Delete Succes");
      fetchBarang();
      setUser(user.filter((item) => item.id !== id));
    } catch (error) {
      console.error("Error deleting item:", error);
      toast.error("Delete failed. Please try again.");
    }
  };

  const handleSubmit = async (values: z.infer<typeof formSchema>) => {
    const token = localStorage.getItem("token");
    toast.promise(
      axios
        .post(`${process.env.NEXT_PUBLIC_BASE_URL}/admin/user`, values, {
          headers: {
            Authorization: `Bearer ${token}`,
            "ngrok-skip-browser-warning": "69420",
          },
        })
        .then(() => {
          fetchBarang();
        })
        .catch((error) => {
          console.error("Error:", error);
          throw new Error("Login failed. Please try again.");
        }),
      {
        loading: "Loading...",
        success: "Add user successful!",
        error: "Add use failed. Please try again.",
      }
    );
  };

  const handleUpdate = async (
    values: z.infer<typeof formSchema>,
    id: number
  ) => {
    const token = localStorage.getItem("token");
    toast.promise(
      axios
        .put(
          `${process.env.NEXT_PUBLIC_BASE_URL}/admin/user?id=${selectedUser?.id}`,
          values,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "ngrok-skip-browser-warning": "69420",
            },
          }
        )
        .then(() => {
          fetchBarang();
        })
        .catch((error) => {
          console.error("Error:", error);
          throw new Error("Update failed. Please try again.");
        }),
      {
        loading: "Loading...",
        success: "Update user successful!",
        error: "Update use failed. Please try again.",
      }
    );
  };

  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  return (
    <div className="bg-white h-full w-full font-sans flex flex-col p-4">
      <div className="w-full flex justify-between items-center">
        <Link
          href={"/dashboard"}
          className="flex items-center justify-center gap-2"
        >
          <svg
            width="32"
            height="33"
            viewBox="0 0 32 33"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M27.9748 14.1407H8.79205L13.4079 9.47738C13.8015 9.07968 13.9874 8.60528 13.9874 8.08444C13.9874 7.0912 13.1751 6.06567 11.9892 6.06567C11.4586 6.06567 10.9961 6.26048 10.6104 6.65111L2.65957 14.6838C2.33187 15.0148 1.99817 15.4236 1.99817 16.1595C1.99817 16.8953 2.27692 17.2496 2.64359 17.6201L10.6104 25.6678C10.9961 26.0585 11.4586 26.2533 11.9892 26.2533C13.1761 26.2533 13.9874 25.2278 13.9874 24.2345C13.9874 23.7137 13.8015 23.2393 13.4079 22.8416L8.79205 18.1782H27.9748C29.0778 18.1782 29.973 17.2738 29.973 16.1595C29.973 15.0451 29.0778 14.1407 27.9748 14.1407Z"
              fill="black"
            />
          </svg>
          <p className="font-bold">Dashboard</p>
        </Link>

        <Dialog>
          <DialogTrigger asChild>
            <div className="flex gap-2 cursor-pointer">
              <svg
                width="28"
                height="28"
                viewBox="0 0 28 28"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M13.8678 2.34973C7.52554 2.34973 2.37817 7.55006 2.37817 13.9576C2.37817 20.3652 7.52554 25.5655 13.8678 25.5655C20.2101 25.5655 25.3575 20.3652 25.3575 13.9576C25.3575 7.55006 20.2101 2.34973 13.8678 2.34973ZM18.4637 15.1184H15.0168V18.6008C15.0168 19.2392 14.4998 19.7616 13.8678 19.7616C13.2359 19.7616 12.7189 19.2392 12.7189 18.6008V15.1184H9.27196C8.64003 15.1184 8.123 14.596 8.123 13.9576C8.123 13.3192 8.64003 12.7968 9.27196 12.7968H12.7189V9.31446C12.7189 8.67603 13.2359 8.15367 13.8678 8.15367C14.4998 8.15367 15.0168 8.67603 15.0168 9.31446V12.7968H18.4637C19.0956 12.7968 19.6126 13.3192 19.6126 13.9576C19.6126 14.596 19.0956 15.1184 18.4637 15.1184Z"
                  fill="#1D1D1D"
                />
              </svg>
              <p className="font-bold underline">New User</p>
            </div>
          </DialogTrigger>
          <DialogContent className="sm:max-w-2xl  bg-[#D0D9EB]">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(handleSubmit)}
                className="w-full flex flex-col gap-4"
              >
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem className="relative">
                      <p className="font-semibold text-lg translate-y-2">
                        Name
                      </p>
                      <FormControl>
                        <div className="relative flex items-center">
                          <Input
                            placeholder="Name"
                            type="text"
                            {...field}
                            className="p-6 bg-[#C6DBE0] placeholder:text-xl placeholder:text-zinc-600 text-primary text-xl rounded-full"
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="username"
                  render={({ field }) => (
                    <FormItem className="relative">
                      <p className="font-semibold text-lg translate-y-2">
                        Username
                      </p>
                      <FormControl>
                        <div className="relative flex items-center">
                          <Input
                            placeholder="Username "
                            type="text"
                            {...field}
                            className="p-6 bg-[#C6DBE0] placeholder:text-xl placeholder:text-zinc-600 text-primary text-xl rounded-full"
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <p className="font-semibold text-lg translate-y-2">
                        Password
                      </p>
                      <FormControl>
                        <div className="relative flex items-center">
                          <Input
                            placeholder="Password"
                            type="password"
                            {...field}
                            className="p-6 bg-[#C6DBE0] placeholder:text-xl placeholder:text-zinc-600 text-primary text-xl rounded-full"
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="role"
                  render={({ field }) => {
                    return (
                      <FormItem>
                        <FormLabel>Role</FormLabel>
                        <Select
                          onValueChange={(value: string) =>
                            field.onChange(parseInt(value))
                          }
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select Role" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="1">Admin</SelectItem>
                            <SelectItem value="2">User</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    );
                  }}
                />

                <div className="w-full flex justify-center gap-4 ">
                  <button
                    type="submit"
                    className="px-8 py-2 bg-[#B9FF99] rounded-md font-sans font-bold"
                  >
                    Add
                  </button>
                  <DialogClose asChild>
                    <button
                      type="button"
                      className="px-6 py-2 bg-[#FFFCB6] rounded-md font-sans font-bold"
                    >
                      Close
                    </button>
                  </DialogClose>
                </div>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      </div>
      <Dialog
        open={isUpdateModalOpen}
        onOpenChange={() => setIsUpdateModalOpen(false)}
      >
        <DialogContent>
          <Form {...form}>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (selectedUser) {
                  handleUpdate(form.getValues(), selectedUser.id);
                }
              }}
              className="space-y-4"
            >
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nama</FormLabel>
                    <FormControl>
                      <Input
                        placeholder={selectedUser?.nama}
                        {...field}
                        defaultValue={selectedUser?.nama}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Username</FormLabel>
                    <FormControl>
                      <Input
                        placeholder={selectedUser?.username}
                        {...field}
                        defaultValue={selectedUser?.username}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <p className="font-semibold text-lg translate-y-2">Password</p>
                    <FormControl>
                      <div className="relative flex items-center">
                        <Input
                          placeholder="Password"
                          type={isPasswordVisible ? "text" : "password"}
                          value={isPasswordVisible ? field.value : '*'.repeat(field.value.length)}
                          {...field}
                          className="p-6 bg-[#C6DBE0] placeholder:text-xl placeholder:text-zinc-600 text-primary text-xl rounded-full"
                        />
                        <button
                          type="button"
                          onClick={() => setIsPasswordVisible(!isPasswordVisible)}
                          className="absolute right-3 p-2"
                        >
                          {isPasswordVisible ? "Hide" : "Show"}
                        </button>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="role"
                render={({ field }) => {
                  return (
                    <FormItem>
                      <FormLabel>Role</FormLabel>
                      <Select
                        onValueChange={(value: string) =>
                          field.onChange(parseInt(value))
                        }
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder={selectedUser?.role} />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="1">Admin</SelectItem>
                          <SelectItem value="2">User</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  );
                }}
              />
              <button
                type="submit"
                className="px-8 py-2 bg-[#B9FF99] rounded-md font-sans font-bold"
              >
                Update
              </button>
              <DialogClose asChild>
                <button
                  type="button"
                  className="px-6 py-2 bg-[#FFFCB6] rounded-md font-sans font-bold"
                >
                  Cancel
                </button>
              </DialogClose>
            </form>
          </Form>
        </DialogContent>
      </Dialog>

      <UserTable
        data={user}
        onDelete={handleDelete}
        onUpdate={(user: User) => {
          setSelectedUser(user);
          setIsUpdateModalOpen(true);
        }}
      />
    </div>
  );
};

export default UsersPage;
