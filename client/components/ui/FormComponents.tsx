// app/components/ui/FormComponents.tsx
import React from 'react';
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";

export const FormSection = ({ title, children }: { title: string; children: React.ReactNode }) => {
  return (
    <div className="w-full md:w-1/2 px-4">
      <h2 className="text-accent text-xl font-semibold mb-4">{title}</h2>
      <div className="space-y-4">{children}</div>
    </div>
  );
};

export const InputField = ({ label, name, type = "text", value, onChange }: any) => {
  return (
    <div>
      <Label className="block text-sm font-medium mb-1">{label}</Label>
      <Input type={type} name={name} value={value} onChange={onChange} className="w-full p-2 border rounded-lg text-black" />
    </div>
  );
};

export const SelectField = ({ label, name, options, value, onChange }: any) => {
  return (
    <div>
      <Label className="block text-sm font-medium mb-1">{label}</Label>
      <Select onValueChange={onChange}>
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Select an option" />
        </SelectTrigger>
        <SelectContent>
          {options.map((option: any, index: number) => (
            <SelectItem key={index} value={option.value}>{option.label}</SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};
