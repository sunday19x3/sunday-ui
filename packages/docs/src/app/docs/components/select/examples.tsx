"use client";

import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
  SelectGroup,
  SelectLabel,
} from "@/components/ui/select";

export function SelectBasicExample() {
  return (
    <div className="w-full max-w-sm">
      <Select>
        <SelectTrigger>
          <SelectValue placeholder="Select a fruit" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="apple">Apple</SelectItem>
          <SelectItem value="banana">Banana</SelectItem>
          <SelectItem value="cherry">Cherry</SelectItem>
          <SelectItem value="grape">Grape</SelectItem>
          <SelectItem value="orange">Orange</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}

export function SelectGroupExample() {
  return (
    <div className="w-full max-w-sm">
      <Select>
        <SelectTrigger>
          <SelectValue placeholder="Select a timezone" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>North America</SelectLabel>
            <SelectItem value="est">Eastern (UTC-5)</SelectItem>
            <SelectItem value="cst">Central (UTC-6)</SelectItem>
            <SelectItem value="mst">Mountain (UTC-7)</SelectItem>
            <SelectItem value="pst">Pacific (UTC-8)</SelectItem>
          </SelectGroup>
          <SelectGroup>
            <SelectLabel>Europe</SelectLabel>
            <SelectItem value="gmt">GMT (UTC+0)</SelectItem>
            <SelectItem value="cet">CET (UTC+1)</SelectItem>
            <SelectItem value="eet">EET (UTC+2)</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
}

export function SelectDisabledExample() {
  return (
    <div className="w-full max-w-sm">
      <Select>
        <SelectTrigger>
          <SelectValue placeholder="Select a plan" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="free">Free</SelectItem>
          <SelectItem value="pro">Pro</SelectItem>
          <SelectItem value="enterprise" disabled>
            Enterprise (Coming Soon)
          </SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}

export function SelectDefaultValueExample() {
  return (
    <div className="w-full max-w-sm">
      <Select defaultValue="banana">
        <SelectTrigger>
          <SelectValue placeholder="Select a fruit" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="apple">Apple</SelectItem>
          <SelectItem value="banana">Banana</SelectItem>
          <SelectItem value="cherry">Cherry</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}
