"use client";

import { useSettings } from "@/contexts/settings-context";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Laptop, Smartphone, Tablet } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

const defaultAvatars = [
  "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/9439775.jpg-4JVJWOjPksd3DtnBYJXoWHA5lc1DU9.jpeg",
  "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/375238645_11475210.jpg-lU8bOe6TLt5Rv51hgjg8NT8PsDBmvN.jpeg",
  "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/375238208_11475222.jpg-poEIzVHAGiIfMFQ7EiF8PUG1u0Zkzz.jpeg",
  "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/dd.jpg-4MCwPC2Bec6Ume26Yo1kao3CnONxDg.jpeg",
  "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/9334178.jpg-Y74tW6XFO68g7N36SE5MSNDNVKLQ08.jpeg",
  "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/5295.jpg-fLw0wGGZp8wuTzU5dnyfjZDwAHN98a.jpeg",
  "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/9720029.jpg-Yf9h2a3kT7rYyCb648iLIeHThq5wEy.jpeg",
  "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/27470341_7294795.jpg-XE0zf7R8tk4rfA1vm4fAHeZ1QoVEOo.jpeg",
  "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/799.jpg-0tEi4Xvg5YsFoGoQfQc698q4Dygl1S.jpeg",
  "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/9334228.jpg-eOsHCkvVrVAwcPHKYSs5sQwVKsqWpC.jpeg",
];

export default function SettingsPage() {
  const {
    settings,
    updateSettings,
    updateNotificationSettings,
    updatePrivacySettings,
  } = useSettings();
  const [selectedAvatar, setSelectedAvatar] = useState(settings.avatar);

  const handleSaveAccount = () => {
    updateSettings({
      avatar: selectedAvatar,
      fullName: settings.fullName,
      email: settings.email,
      phone: settings.phone,
      timezone: settings.timezone,
    });
    toast.success("Account settings saved successfully");
  };

  const handleSaveNotifications = () => {
    updateNotificationSettings(settings.notifications);
    toast.success("Notification settings saved successfully");
  };

  const handleSavePrivacy = () => {
    updatePrivacySettings(settings.privacy);
    toast.success("Privacy settings saved successfully");
  };

  return (
    <div className="container mx-auto py-10" data-oid="kh9h_cg">
      <h1 className="text-3xl font-bold mb-6" data-oid="5ccv52g">
        Settings
      </h1>
      <Tabs defaultValue="account" className="space-y-4" data-oid="5g3r9ic">
        <TabsList className="grid w-full grid-cols-5" data-oid="7vf4wl2">
          <TabsTrigger value="account" data-oid="_nenbm7">
            Account
          </TabsTrigger>
          <TabsTrigger value="security" data-oid="pu4v-f8">
            Security
          </TabsTrigger>
          <TabsTrigger value="preferences" data-oid="x7yhs2y">
            Preferences
          </TabsTrigger>
          <TabsTrigger value="notifications" data-oid="c1h4p9g">
            Notifications
          </TabsTrigger>
          <TabsTrigger value="privacy" data-oid="q92puat">
            Privacy
          </TabsTrigger>
        </TabsList>

        <TabsContent value="account" data-oid="sbss:q9">
          <Card data-oid="7grvhhf">
            <CardHeader data-oid=":1h32kc">
              <CardTitle data-oid="f-v5-hb">Account Settings</CardTitle>
              <CardDescription data-oid="_z-rp70">
                Manage your account information
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6" data-oid="b35z36c">
              <div className="space-y-4" data-oid="6h2:c:b">
                <Label data-oid="1:i-1ae">Current Avatar</Label>
                <div className="flex items-center space-x-4" data-oid="1xanp79">
                  <Avatar className="h-20 w-20" data-oid="tj6we0v">
                    <AvatarImage
                      src={selectedAvatar}
                      alt={settings.fullName}
                      data-oid="v9vsq2q"
                    />

                    <AvatarFallback data-oid="6jw.lc0">
                      {settings.fullName
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                </div>
                <Label data-oid="-7lk-ox">Choose a new avatar</Label>
                <div
                  className="flex gap-4 overflow-x-auto pb-2"
                  data-oid="sh16hen"
                >
                  {defaultAvatars.map((avatar, index) => (
                    <Avatar
                      key={index}
                      className={`h-20 w-20 rounded-lg cursor-pointer hover:ring-2 hover:ring-primary shrink-0 ${
                        selectedAvatar === avatar ? "ring-2 ring-primary" : ""
                      }`}
                      onClick={() => setSelectedAvatar(avatar)}
                      data-oid="6d:ik2w"
                    >
                      <AvatarImage
                        src={avatar}
                        alt={`Avatar ${index + 1}`}
                        className="object-cover"
                        data-oid="qd-h6nm"
                      />

                      <AvatarFallback data-oid="vmitaew">
                        {index + 1}
                      </AvatarFallback>
                    </Avatar>
                  ))}
                </div>
                <div data-oid="af7p:ks">
                  <Label htmlFor="custom-avatar" data-oid="9g-cb5d">
                    Or upload a custom avatar
                  </Label>
                  <Input
                    id="custom-avatar"
                    type="file"
                    accept="image/*"
                    className="mt-1"
                    data-oid="bjhsjli"
                  />
                </div>
              </div>
              <div className="space-y-2" data-oid="p1vv8pd">
                <Label htmlFor="full-name" data-oid=".-1e-oo">
                  Full Name
                </Label>
                <Input
                  id="full-name"
                  value={settings.fullName}
                  onChange={(e) => updateSettings({ fullName: e.target.value })}
                  data-oid="da7n2zk"
                />
              </div>
              <div className="space-y-2" data-oid="6p_nmro">
                <Label htmlFor="email" data-oid="ix8a1aw">
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={settings.email}
                  onChange={(e) => updateSettings({ email: e.target.value })}
                  data-oid="r900180"
                />
              </div>
              <div className="space-y-2" data-oid="bu5va:m">
                <Label htmlFor="phone" data-oid="2u10pp3">
                  Phone Number
                </Label>
                <Input
                  id="phone"
                  type="tel"
                  value={settings.phone}
                  onChange={(e) => updateSettings({ phone: e.target.value })}
                  data-oid="1j303vv"
                />
              </div>
              <div className="space-y-2" data-oid="1we-fbi">
                <Label htmlFor="timezone" data-oid="9knju2c">
                  Timezone
                </Label>
                <Select
                  value={settings.timezone}
                  onValueChange={(value) => updateSettings({ timezone: value })}
                  data-oid="i:kxlgo"
                >
                  <SelectTrigger id="timezone" data-oid="-pi0p_-">
                    <SelectValue
                      placeholder="Select Timezone"
                      data-oid="bxx6ej-"
                    />
                  </SelectTrigger>
                  <SelectContent data-oid="6xw6yny">
                    <SelectItem value="utc-12" data-oid="1.d3qx_">
                      International Date Line West (UTC-12)
                    </SelectItem>
                    <SelectItem value="utc-11" data-oid="x9h2o5g">
                      Samoa Standard Time (UTC-11)
                    </SelectItem>
                    <SelectItem value="utc-10" data-oid="xmhv75x">
                      Hawaii-Aleutian Standard Time (UTC-10)
                    </SelectItem>
                    <SelectItem value="utc-9" data-oid="vky24oo">
                      Alaska Standard Time (UTC-9)
                    </SelectItem>
                    <SelectItem value="utc-8" data-oid="ub276kw">
                      Pacific Time (UTC-8)
                    </SelectItem>
                    <SelectItem value="utc-7" data-oid="a69a:oy">
                      Mountain Time (UTC-7)
                    </SelectItem>
                    <SelectItem value="utc-6" data-oid="bidvq52">
                      Central Time (UTC-6)
                    </SelectItem>
                    <SelectItem value="utc-5" data-oid="arrl72j">
                      Eastern Time (UTC-5)
                    </SelectItem>
                    <SelectItem value="utc-4" data-oid="njpofnb">
                      Atlantic Time (UTC-4)
                    </SelectItem>
                    <SelectItem value="utc-3" data-oid="0jd.mla">
                      Argentina Standard Time (UTC-3)
                    </SelectItem>
                    <SelectItem value="utc-2" data-oid="8lh_7dw">
                      South Georgia Time (UTC-2)
                    </SelectItem>
                    <SelectItem value="utc-1" data-oid="fu5p8-s">
                      Azores Time (UTC-1)
                    </SelectItem>
                    <SelectItem value="utc+0" data-oid="4c_tc_6">
                      Greenwich Mean Time (UTC+0)
                    </SelectItem>
                    <SelectItem value="utc+1" data-oid="8urxtm1">
                      Central European Time (UTC+1)
                    </SelectItem>
                    <SelectItem value="utc+2" data-oid="s2-f60y">
                      Eastern European Time (UTC+2)
                    </SelectItem>
                    <SelectItem value="utc+3" data-oid="9m.av2w">
                      Moscow Time (UTC+3)
                    </SelectItem>
                    <SelectItem value="utc+4" data-oid="y64prha">
                      Gulf Standard Time (UTC+4)
                    </SelectItem>
                    <SelectItem value="utc+5" data-oid="j9lk4_l">
                      Pakistan Standard Time (UTC+5)
                    </SelectItem>
                    <SelectItem value="utc+5.5" data-oid="j4fksh_">
                      Indian Standard Time (UTC+5:30)
                    </SelectItem>
                    <SelectItem value="utc+6" data-oid="kfer_pv">
                      Bangladesh Standard Time (UTC+6)
                    </SelectItem>
                    <SelectItem value="utc+7" data-oid="x36bdbm">
                      Indochina Time (UTC+7)
                    </SelectItem>
                    <SelectItem value="utc+8" data-oid="ei0x9mu">
                      China Standard Time (UTC+8)
                    </SelectItem>
                    <SelectItem value="utc+9" data-oid="i.c85o9">
                      Japan Standard Time (UTC+9)
                    </SelectItem>
                    <SelectItem value="utc+10" data-oid="iv_i79p">
                      Australian Eastern Standard Time (UTC+10)
                    </SelectItem>
                    <SelectItem value="utc+11" data-oid="gl0nc:2">
                      Solomon Islands Time (UTC+11)
                    </SelectItem>
                    <SelectItem value="utc+12" data-oid="vwk6e2b">
                      New Zealand Standard Time (UTC+12)
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
            <CardFooter data-oid="168oq.b">
              <Button onClick={handleSaveAccount} data-oid="wo7qi3:">
                Save Account Settings
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="security" data-oid="x86_y1u">
          <div className="grid gap-4 md:grid-cols-2" data-oid="l-fweh6">
            <Card className="md:col-span-2" data-oid="-q:9gwo">
              <CardHeader data-oid="k.56fdq">
                <CardTitle data-oid="td-vg9z">Security Settings</CardTitle>
                <CardDescription data-oid="np669:g">
                  Manage your account's security settings
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4" data-oid="mag8:1v">
                <div className="space-y-2" data-oid="hnv65py">
                  <Label htmlFor="current-password" data-oid="uxuw39-">
                    Current Password
                  </Label>
                  <Input
                    id="current-password"
                    type="password"
                    data-oid="2la4igs"
                  />
                </div>
                <div className="space-y-2" data-oid="yjih89-">
                  <Label htmlFor="new-password" data-oid="e46mmvj">
                    New Password
                  </Label>
                  <Input id="new-password" type="password" data-oid="l4rjbo_" />
                </div>
                <div className="space-y-2" data-oid="f0v5kq:">
                  <Label htmlFor="confirm-password" data-oid="s949q_-">
                    Confirm New Password
                  </Label>
                  <Input
                    id="confirm-password"
                    type="password"
                    data-oid="dxjb22."
                  />
                </div>
                <div className="flex items-center space-x-2" data-oid="6edt4yi">
                  <Switch id="two-factor" data-oid="v3grd.j" />
                  <Label htmlFor="two-factor" data-oid="j:85kz:">
                    Enable Two-Factor Authentication
                  </Label>
                </div>
              </CardContent>
              <CardFooter data-oid="wxula0y">
                <Button data-oid="1i18ey2">Save Security Settings</Button>
              </CardFooter>
            </Card>

            <Card data-oid="yu7ggsh">
              <CardHeader data-oid="nopu1yl">
                <CardTitle data-oid="1h1-bj5">Login History</CardTitle>
                <CardDescription data-oid="7tf6ygf">
                  Recent login activities on your account
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4" data-oid="syjgajg">
                {[
                  {
                    date: "2023-07-20",
                    time: "14:30 UTC",
                    ip: "192.168.1.1",
                    location: "New York, USA",
                  },
                  {
                    date: "2023-07-19",
                    time: "09:15 UTC",
                    ip: "10.0.0.1",
                    location: "London, UK",
                  },
                  {
                    date: "2023-07-18",
                    time: "22:45 UTC",
                    ip: "172.16.0.1",
                    location: "Tokyo, Japan",
                  },
                ].map((login, index) => (
                  <div
                    key={index}
                    className="flex justify-between items-center text-sm"
                    data-oid="vo_4yp9"
                  >
                    <span data-oid="9sj4co2">
                      {login.date} {login.time}
                    </span>
                    <span data-oid="0zamefd">{login.ip}</span>
                    <span data-oid="nleykq5">{login.location}</span>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card data-oid="b0w73fm">
              <CardHeader data-oid="1qjn6_r">
                <CardTitle data-oid="h3u9ttt">Active Sessions</CardTitle>
                <CardDescription data-oid="p4x586f">
                  Currently active sessions on your account
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4" data-oid="pwwv.nf">
                {[
                  {
                    device: "Laptop",
                    browser: "Chrome",
                    os: "Windows 10",
                    icon: Laptop,
                  },
                  {
                    device: "Smartphone",
                    browser: "Safari",
                    os: "iOS 15",
                    icon: Smartphone,
                  },
                  {
                    device: "Tablet",
                    browser: "Firefox",
                    os: "Android 12",
                    icon: Tablet,
                  },
                ].map((session, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between text-sm"
                    data-oid="ibdw2fw"
                  >
                    <span className="flex items-center" data-oid="tf8bh9m">
                      <session.icon
                        className="mr-2 h-4 w-4"
                        data-oid="popjpex"
                      />

                      {session.device}
                    </span>
                    <span data-oid="sf46qik">{session.browser}</span>
                    <span data-oid=":np0j.t">{session.os}</span>
                  </div>
                ))}
              </CardContent>
              <CardFooter data-oid="ghecn79">
                <Button variant="outline" data-oid="gv3a3n8">
                  Log Out All Other Sessions
                </Button>
              </CardFooter>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="preferences" data-oid="croz_7-">
          <Card data-oid="7sh2a7-">
            <CardHeader data-oid="6yw2-uy">
              <CardTitle data-oid="bqidq0o">Preferences</CardTitle>
              <CardDescription data-oid="nw5gnhy">
                Customize your dashboard experience
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4" data-oid="fb-x95h">
              <div className="grid gap-4 md:grid-cols-2" data-oid="n-_45f9">
                <div className="space-y-2" data-oid="9m9je2.">
                  <Label htmlFor="language" data-oid="4bdw5lt">
                    Language
                  </Label>
                  <Select defaultValue="en" data-oid="vz6:o39">
                    <SelectTrigger id="language" data-oid="icjltl_">
                      <SelectValue
                        placeholder="Select Language"
                        data-oid="ht3g:a0"
                      />
                    </SelectTrigger>
                    <SelectContent data-oid="sde8hfz">
                      <SelectItem value="en" data-oid="..45g7t">
                        English
                      </SelectItem>
                      <SelectItem value="es" data-oid="x_uf46n">
                        Español
                      </SelectItem>
                      <SelectItem value="fr" data-oid="6jdewou">
                        Français
                      </SelectItem>
                      <SelectItem value="de" data-oid="xyp7g51">
                        Deutsch
                      </SelectItem>
                      <SelectItem value="zh" data-oid="g78t8x7">
                        中文
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2" data-oid="wlsa7k:">
                  <Label htmlFor="currency" data-oid="t:4_70n">
                    Currency
                  </Label>
                  <Select defaultValue="usd" data-oid="am2:9d1">
                    <SelectTrigger id="currency" data-oid="pgq0q5r">
                      <SelectValue
                        placeholder="Select Currency"
                        data-oid="6qrbuv8"
                      />
                    </SelectTrigger>
                    <SelectContent data-oid="qj2w1q_">
                      <SelectItem value="usd" data-oid="6hx8qvt">
                        USD ($)
                      </SelectItem>
                      <SelectItem value="eur" data-oid="5hxur-w">
                        EUR (€)
                      </SelectItem>
                      <SelectItem value="gbp" data-oid="c90fct4">
                        GBP (£)
                      </SelectItem>
                      <SelectItem value="jpy" data-oid="t9-w.go">
                        JPY (¥)
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2" data-oid="if7fs1a">
                  <Label htmlFor="date-format" data-oid="9051:vk">
                    Date Format
                  </Label>
                  <Select defaultValue="mm-dd-yyyy" data-oid="-8usec-">
                    <SelectTrigger id="date-format" data-oid="n8.9t8j">
                      <SelectValue
                        placeholder="Select Date Format"
                        data-oid="vvsvo9l"
                      />
                    </SelectTrigger>
                    <SelectContent data-oid=".teqo.1">
                      <SelectItem value="mm-dd-yyyy" data-oid="l81xpiz">
                        MM-DD-YYYY
                      </SelectItem>
                      <SelectItem value="dd-mm-yyyy" data-oid="rx.v0ch">
                        DD-MM-YYYY
                      </SelectItem>
                      <SelectItem value="yyyy-mm-dd" data-oid="69e_1ki">
                        YYYY-MM-DD
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2" data-oid="i2.98iv">
                  <Label htmlFor="font-size" data-oid="eav0.fg">
                    Font Size
                  </Label>
                  <Slider
                    defaultValue={[16]}
                    max={24}
                    min={12}
                    step={1}
                    data-oid="84i9n90"
                  />
                </div>
              </div>
              <div className="space-y-2" data-oid="6wwuzc0">
                <Label data-oid="vfl130m">Theme</Label>
                <RadioGroup defaultValue="system" data-oid="3so1duo">
                  <div
                    className="flex items-center space-x-2"
                    data-oid=".bv6c73"
                  >
                    <RadioGroupItem
                      value="light"
                      id="theme-light"
                      data-oid="unb8izy"
                    />

                    <Label htmlFor="theme-light" data-oid="9h5dt21">
                      Light
                    </Label>
                  </div>
                  <div
                    className="flex items-center space-x-2"
                    data-oid="jv4gsvw"
                  >
                    <RadioGroupItem
                      value="dark"
                      id="theme-dark"
                      data-oid="6h:elgd"
                    />

                    <Label htmlFor="theme-dark" data-oid="7nqcafb">
                      Dark
                    </Label>
                  </div>
                  <div
                    className="flex items-center space-x-2"
                    data-oid="7lztwq:"
                  >
                    <RadioGroupItem
                      value="system"
                      id="theme-system"
                      data-oid="2ds09cm"
                    />

                    <Label htmlFor="theme-system" data-oid="bbruv6u">
                      System
                    </Label>
                  </div>
                </RadioGroup>
              </div>
              <div className="space-y-2" data-oid="3hwidzr">
                <Label data-oid="6.sn243">Dashboard Layout</Label>
                <RadioGroup defaultValue="default" data-oid="-pi8ut1">
                  <div
                    className="flex items-center space-x-2"
                    data-oid="n_acn-l"
                  >
                    <RadioGroupItem
                      value="default"
                      id="layout-default"
                      data-oid="s.3ufhx"
                    />

                    <Label htmlFor="layout-default" data-oid="m5vj7dx">
                      Default
                    </Label>
                  </div>
                  <div
                    className="flex items-center space-x-2"
                    data-oid="3kte7z6"
                  >
                    <RadioGroupItem
                      value="compact"
                      id="layout-compact"
                      data-oid="-4krgrw"
                    />

                    <Label htmlFor="layout-compact" data-oid="aya0bd_">
                      Compact
                    </Label>
                  </div>
                  <div
                    className="flex items-center space-x-2"
                    data-oid="njqe50_"
                  >
                    <RadioGroupItem
                      value="expanded"
                      id="layout-expanded"
                      data-oid="ts5bj:s"
                    />

                    <Label htmlFor="layout-expanded" data-oid=".s:bfj-">
                      Expanded
                    </Label>
                  </div>
                </RadioGroup>
              </div>
            </CardContent>
            <CardFooter data-oid="7il4nit">
              <Button data-oid="zdakeiu">Save Preferences</Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="notifications" data-oid=":r3h_2t">
          <Card data-oid="-4bdjjl">
            <CardHeader data-oid="-ex9mat">
              <CardTitle data-oid="_y2g-2q">Notification Settings</CardTitle>
              <CardDescription data-oid=".:e_e5i">
                Manage how you receive notifications
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4" data-oid="h9poihl">
              <div className="grid gap-4 md:grid-cols-2" data-oid="e3h3z7f">
                <div className="space-y-2" data-oid="h_xmxgs">
                  <Label data-oid="dxsymi1">Notification Channels</Label>
                  <div
                    className="flex items-center space-x-2"
                    data-oid="74tghb4"
                  >
                    <Checkbox
                      id="email-notifications"
                      defaultChecked={settings.notifications.email}
                      onChange={(e) =>
                        updateNotificationSettings({
                          ...settings.notifications,
                          email: e.target.checked,
                        })
                      }
                      data-oid="q_ragau"
                    />

                    <Label htmlFor="email-notifications" data-oid="8thfzd7">
                      Email Notifications
                    </Label>
                  </div>
                  <div
                    className="flex items-center space-x-2"
                    data-oid="3sn4jkm"
                  >
                    <Checkbox
                      id="push-notifications"
                      defaultChecked={settings.notifications.push}
                      onChange={(e) =>
                        updateNotificationSettings({
                          ...settings.notifications,
                          push: e.target.checked,
                        })
                      }
                      data-oid="sli2kas"
                    />

                    <Label htmlFor="push-notifications" data-oid="ury4xms">
                      Push Notifications
                    </Label>
                  </div>
                  <div
                    className="flex items-center space-x-2"
                    data-oid=":4359kz"
                  >
                    <Checkbox
                      id="sms-notifications"
                      defaultChecked={settings.notifications.sms}
                      onChange={(e) =>
                        updateNotificationSettings({
                          ...settings.notifications,
                          sms: e.target.checked,
                        })
                      }
                      data-oid="qejw0jt"
                    />

                    <Label htmlFor="sms-notifications" data-oid="7qsublm">
                      SMS Notifications
                    </Label>
                  </div>
                </div>
                <div className="space-y-2" data-oid="k:odo.v">
                  <Label data-oid="_:390ml">Notification Types</Label>
                  <div
                    className="flex items-center space-x-2"
                    data-oid="9rpwh21"
                  >
                    <Checkbox
                      id="account-activity"
                      defaultChecked={settings.notifications.accountActivity}
                      onChange={(e) =>
                        updateNotificationSettings({
                          ...settings.notifications,
                          accountActivity: e.target.checked,
                        })
                      }
                      data-oid="s3k_5eo"
                    />

                    <Label htmlFor="account-activity" data-oid="6xshw2g">
                      Account Activity
                    </Label>
                  </div>
                  <div
                    className="flex items-center space-x-2"
                    data-oid="21:_rkh"
                  >
                    <Checkbox
                      id="new-features"
                      defaultChecked={settings.notifications.newFeatures}
                      onChange={(e) =>
                        updateNotificationSettings({
                          ...settings.notifications,
                          newFeatures: e.target.checked,
                        })
                      }
                      data-oid="905tksr"
                    />

                    <Label htmlFor="new-features" data-oid="9.vsi4v">
                      New Features and Updates
                    </Label>
                  </div>
                  <div
                    className="flex items-center space-x-2"
                    data-oid="t39vjy6"
                  >
                    <Checkbox
                      id="marketing"
                      defaultChecked={settings.notifications.marketing}
                      onChange={(e) =>
                        updateNotificationSettings({
                          ...settings.notifications,
                          marketing: e.target.checked,
                        })
                      }
                      data-oid="mbk_y6i"
                    />

                    <Label htmlFor="marketing" data-oid="bbj8:22">
                      Marketing and Promotions
                    </Label>
                  </div>
                </div>
              </div>
              <div className="space-y-2" data-oid="-a9dutx">
                <Label htmlFor="notification-frequency" data-oid="ebaa3m-">
                  Notification Frequency
                </Label>
                <Select
                  value={settings.notifications.frequency}
                  onValueChange={(value) =>
                    updateNotificationSettings({
                      ...settings.notifications,
                      frequency: value,
                    })
                  }
                  data-oid="y6j:5xd"
                >
                  <SelectTrigger id="notification-frequency" data-oid="dgvq6pp">
                    <SelectValue
                      placeholder="Select Frequency"
                      data-oid="5eeghym"
                    />
                  </SelectTrigger>
                  <SelectContent data-oid="a:d7h71">
                    <SelectItem value="real-time" data-oid="_yig:ud">
                      Real-time
                    </SelectItem>
                    <SelectItem value="daily" data-oid="v2mvv5-">
                      Daily Digest
                    </SelectItem>
                    <SelectItem value="weekly" data-oid="4sknlp1">
                      Weekly Summary
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2" data-oid="ge3kp.l">
                <Label htmlFor="quiet-hours-start" data-oid="l.9ygrb">
                  Quiet Hours
                </Label>
                <div className="flex items-center space-x-2" data-oid="oxrdmyj">
                  <Input
                    id="quiet-hours-start"
                    type="time"
                    defaultValue="22:00"
                    data-oid="mek2_qk"
                  />

                  <span data-oid="9:fw8_s">to</span>
                  <Input
                    id="quiet-hours-end"
                    type="time"
                    defaultValue="07:00"
                    data-oid="7zqe60."
                  />
                </div>
              </div>
            </CardContent>
            <CardFooter data-oid="__6.ylz">
              <Button onClick={handleSaveNotifications} data-oid="sosxt_.">
                Save Notification Settings
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="privacy" data-oid="6jxi4w6">
          <Card data-oid="0_.dc:s">
            <CardHeader data-oid="lemjtpn">
              <CardTitle data-oid="l8g2kl9">Privacy Settings</CardTitle>
              <CardDescription data-oid="5r7ildc">
                Manage your privacy and data settings
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6" data-oid="204ovgs">
              <div className="grid gap-4 md:grid-cols-2" data-oid="zlcitbz">
                <Card data-oid="wxqp:5_">
                  <CardHeader data-oid="4jp1z85">
                    <CardTitle className="text-lg" data-oid="w1meltp">
                      Data Sharing
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2" data-oid="_apu3_k">
                    <div
                      className="flex items-center justify-between"
                      data-oid="7zd9r9o"
                    >
                      <Label htmlFor="analytics-sharing" data-oid="1tcmjeq">
                        Share analytics data
                      </Label>
                      <Switch
                        id="analytics-sharing"
                        checked={settings.privacy.analyticsSharing}
                        onChange={(e) =>
                          updatePrivacySettings({
                            ...settings.privacy,
                            analyticsSharing: e.target.checked,
                          })
                        }
                        data-oid="irh4x0x"
                      />
                    </div>
                    <div
                      className="flex items-center justify-between"
                      data-oid="-9a4:jy"
                    >
                      <Label htmlFor="personalized-ads" data-oid="g9zm4d_">
                        Allow personalized ads
                      </Label>
                      <Switch
                        id="personalized-ads"
                        checked={settings.privacy.personalizedAds}
                        onChange={(e) =>
                          updatePrivacySettings({
                            ...settings.privacy,
                            personalizedAds: e.target.checked,
                          })
                        }
                        data-oid="d3uhly6"
                      />
                    </div>
                  </CardContent>
                </Card>
                <Card data-oid="tez6lkm">
                  <CardHeader data-oid="4zg8idt">
                    <CardTitle className="text-lg" data-oid="t7cmca0">
                      Account Visibility
                    </CardTitle>
                  </CardHeader>
                  <CardContent data-oid="22bqmvm">
                    <RadioGroup
                      value={settings.privacy.visibility}
                      onValueChange={(value) =>
                        updatePrivacySettings({
                          ...settings.privacy,
                          visibility: value,
                        })
                      }
                      data-oid="xeh4_5k"
                    >
                      <div
                        className="flex items-center space-x-2"
                        data-oid="3ml_d-."
                      >
                        <RadioGroupItem
                          value="public"
                          id="visibility-public"
                          data-oid="miyc5pz"
                        />

                        <Label htmlFor="visibility-public" data-oid="69e9wj8">
                          Public
                        </Label>
                      </div>
                      <div
                        className="flex items-center space-x-2"
                        data-oid="u4t8vzj"
                      >
                        <RadioGroupItem
                          value="private"
                          id="visibility-private"
                          data-oid="5k.-gku"
                        />

                        <Label htmlFor="visibility-private" data-oid="5cxlgts">
                          Private
                        </Label>
                      </div>
                    </RadioGroup>
                  </CardContent>
                </Card>
              </div>
              <div className="grid gap-4 md:grid-cols-2" data-oid="4920gjz">
                <Card data-oid="gwa48.7">
                  <CardHeader data-oid="ouveepi">
                    <CardTitle className="text-lg" data-oid="_fwc8yd">
                      Data Retention
                    </CardTitle>
                  </CardHeader>
                  <CardContent data-oid="g_mtugc">
                    <Select
                      value={settings.privacy.dataRetention}
                      onValueChange={(value) =>
                        updatePrivacySettings({
                          ...settings.privacy,
                          dataRetention: value,
                        })
                      }
                      data-oid="2y_z4yx"
                    >
                      <SelectTrigger id="data-retention" data-oid="840.eaw">
                        <SelectValue
                          placeholder="Select Data Retention Period"
                          data-oid="04b3q7z"
                        />
                      </SelectTrigger>
                      <SelectContent data-oid="mikui8h">
                        <SelectItem value="6-months" data-oid="grylya4">
                          6 Months
                        </SelectItem>
                        <SelectItem value="1-year" data-oid=".:f7vz-">
                          1 Year
                        </SelectItem>
                        <SelectItem value="2-years" data-oid="agi:ygs">
                          2 Years
                        </SelectItem>
                        <SelectItem value="indefinite" data-oid="0objlo6">
                          Indefinite
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </CardContent>
                </Card>
                <Card data-oid="ck_k7n8">
                  <CardHeader data-oid="i-reuw:">
                    <CardTitle className="text-lg" data-oid="s_q-h0x">
                      Third-Party Integrations
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2" data-oid="6-r4lgj">
                    <p
                      className="text-sm text-muted-foreground"
                      data-oid="u7z:.gl"
                    >
                      Connected: Google Analytics, Facebook Pixel
                    </p>
                    <Button variant="outline" data-oid="azrcfn-">
                      Manage Integrations
                    </Button>
                  </CardContent>
                </Card>
              </div>
              <div className="flex justify-between" data-oid="w1:-8xm">
                <Button variant="outline" data-oid="6n4joyb">
                  Download Your Data
                </Button>
                <Button variant="destructive" data-oid="7-ebh.0">
                  Delete My Account
                </Button>
              </div>
            </CardContent>
            <CardFooter data-oid="iqikbgt">
              <Button onClick={handleSavePrivacy} data-oid="ivh8s1u">
                Save Privacy Settings
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
