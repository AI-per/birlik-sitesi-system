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
    <div className="container mx-auto py-10" data-oid="4e5mnsf">
      <h1 className="text-3xl font-bold mb-6" data-oid="m01z_8n">
        Settings
      </h1>
      <Tabs defaultValue="account" className="space-y-4" data-oid="h0o7w:c">
        <TabsList className="grid w-full grid-cols-5" data-oid="3jed67b">
          <TabsTrigger value="account" data-oid="rodbzhk">
            Account
          </TabsTrigger>
          <TabsTrigger value="security" data-oid="cnqz6s9">
            Security
          </TabsTrigger>
          <TabsTrigger value="preferences" data-oid="1bf4p9.">
            Preferences
          </TabsTrigger>
          <TabsTrigger value="notifications" data-oid="v29hk7w">
            Notifications
          </TabsTrigger>
          <TabsTrigger value="privacy" data-oid="235ri_i">
            Privacy
          </TabsTrigger>
        </TabsList>

        <TabsContent value="account" data-oid="06ltxp4">
          <Card data-oid="p8qd.e_">
            <CardHeader data-oid="pi8qepn">
              <CardTitle data-oid="y26py5z">Account Settings</CardTitle>
              <CardDescription data-oid="tnv-wby">
                Manage your account information
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6" data-oid="nvlp8qh">
              <div className="space-y-4" data-oid="dumvat0">
                <Label data-oid=".i9_3:8">Current Avatar</Label>
                <div className="flex items-center space-x-4" data-oid="vud3fjd">
                  <Avatar className="h-20 w-20" data-oid="fyv1-1i">
                    <AvatarImage
                      src={selectedAvatar}
                      alt={settings.fullName}
                      data-oid="mcrz7d7"
                    />

                    <AvatarFallback data-oid="xjr1ins">
                      {settings.fullName
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                </div>
                <Label data-oid="numwsxu">Choose a new avatar</Label>
                <div
                  className="flex gap-4 overflow-x-auto pb-2"
                  data-oid="hzbp-6o"
                >
                  {defaultAvatars.map((avatar, index) => (
                    <Avatar
                      key={index}
                      className={`h-20 w-20 rounded-lg cursor-pointer hover:ring-2 hover:ring-primary shrink-0 ${
                        selectedAvatar === avatar ? "ring-2 ring-primary" : ""
                      }`}
                      onClick={() => setSelectedAvatar(avatar)}
                      data-oid="pve-ln2"
                    >
                      <AvatarImage
                        src={avatar}
                        alt={`Avatar ${index + 1}`}
                        className="object-cover"
                        data-oid="uvgdnxt"
                      />

                      <AvatarFallback data-oid="a-j.5i.">
                        {index + 1}
                      </AvatarFallback>
                    </Avatar>
                  ))}
                </div>
                <div data-oid="jat3-d_">
                  <Label htmlFor="custom-avatar" data-oid="gb0oed2">
                    Or upload a custom avatar
                  </Label>
                  <Input
                    id="custom-avatar"
                    type="file"
                    accept="image/*"
                    className="mt-1"
                    data-oid="ho8509f"
                  />
                </div>
              </div>
              <div className="space-y-2" data-oid="gy2-sml">
                <Label htmlFor="full-name" data-oid="f.:r4d7">
                  Full Name
                </Label>
                <Input
                  id="full-name"
                  value={settings.fullName}
                  onChange={(e) => updateSettings({ fullName: e.target.value })}
                  data-oid="inxkf.2"
                />
              </div>
              <div className="space-y-2" data-oid="z0_bzm9">
                <Label htmlFor="email" data-oid="pogboc:">
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={settings.email}
                  onChange={(e) => updateSettings({ email: e.target.value })}
                  data-oid="0_49k87"
                />
              </div>
              <div className="space-y-2" data-oid="vt5l9cb">
                <Label htmlFor="phone" data-oid="uj792ei">
                  Phone Number
                </Label>
                <Input
                  id="phone"
                  type="tel"
                  value={settings.phone}
                  onChange={(e) => updateSettings({ phone: e.target.value })}
                  data-oid="i4fp2-9"
                />
              </div>
              <div className="space-y-2" data-oid="y6f4g-q">
                <Label htmlFor="timezone" data-oid=".0euxr9">
                  Timezone
                </Label>
                <Select
                  value={settings.timezone}
                  onValueChange={(value) => updateSettings({ timezone: value })}
                  data-oid="zw7kzh-"
                >
                  <SelectTrigger id="timezone" data-oid="u04ga3f">
                    <SelectValue
                      placeholder="Select Timezone"
                      data-oid="b6.:fh0"
                    />
                  </SelectTrigger>
                  <SelectContent data-oid="iizua98">
                    <SelectItem value="utc-12" data-oid="gmkr0tq">
                      International Date Line West (UTC-12)
                    </SelectItem>
                    <SelectItem value="utc-11" data-oid="olc.v1z">
                      Samoa Standard Time (UTC-11)
                    </SelectItem>
                    <SelectItem value="utc-10" data-oid="y:ybpy:">
                      Hawaii-Aleutian Standard Time (UTC-10)
                    </SelectItem>
                    <SelectItem value="utc-9" data-oid="typb-13">
                      Alaska Standard Time (UTC-9)
                    </SelectItem>
                    <SelectItem value="utc-8" data-oid="p8:qxce">
                      Pacific Time (UTC-8)
                    </SelectItem>
                    <SelectItem value="utc-7" data-oid="y8th:wi">
                      Mountain Time (UTC-7)
                    </SelectItem>
                    <SelectItem value="utc-6" data-oid="hn619r.">
                      Central Time (UTC-6)
                    </SelectItem>
                    <SelectItem value="utc-5" data-oid="h2zi.1r">
                      Eastern Time (UTC-5)
                    </SelectItem>
                    <SelectItem value="utc-4" data-oid="6h3hn5y">
                      Atlantic Time (UTC-4)
                    </SelectItem>
                    <SelectItem value="utc-3" data-oid="ramj4eh">
                      Argentina Standard Time (UTC-3)
                    </SelectItem>
                    <SelectItem value="utc-2" data-oid="jge5gtc">
                      South Georgia Time (UTC-2)
                    </SelectItem>
                    <SelectItem value="utc-1" data-oid="g472rmv">
                      Azores Time (UTC-1)
                    </SelectItem>
                    <SelectItem value="utc+0" data-oid="3x63_ps">
                      Greenwich Mean Time (UTC+0)
                    </SelectItem>
                    <SelectItem value="utc+1" data-oid="ncwnbsn">
                      Central European Time (UTC+1)
                    </SelectItem>
                    <SelectItem value="utc+2" data-oid="c29zhn7">
                      Eastern European Time (UTC+2)
                    </SelectItem>
                    <SelectItem value="utc+3" data-oid="okn06si">
                      Moscow Time (UTC+3)
                    </SelectItem>
                    <SelectItem value="utc+4" data-oid="d5j1zk7">
                      Gulf Standard Time (UTC+4)
                    </SelectItem>
                    <SelectItem value="utc+5" data-oid="xcyvu4h">
                      Pakistan Standard Time (UTC+5)
                    </SelectItem>
                    <SelectItem value="utc+5.5" data-oid="nyicr3e">
                      Indian Standard Time (UTC+5:30)
                    </SelectItem>
                    <SelectItem value="utc+6" data-oid="07cfg1p">
                      Bangladesh Standard Time (UTC+6)
                    </SelectItem>
                    <SelectItem value="utc+7" data-oid="r6.afhw">
                      Indochina Time (UTC+7)
                    </SelectItem>
                    <SelectItem value="utc+8" data-oid="zpbdcd9">
                      China Standard Time (UTC+8)
                    </SelectItem>
                    <SelectItem value="utc+9" data-oid="z78mzgh">
                      Japan Standard Time (UTC+9)
                    </SelectItem>
                    <SelectItem value="utc+10" data-oid="8hzwedb">
                      Australian Eastern Standard Time (UTC+10)
                    </SelectItem>
                    <SelectItem value="utc+11" data-oid="julydgb">
                      Solomon Islands Time (UTC+11)
                    </SelectItem>
                    <SelectItem value="utc+12" data-oid="hrfw8in">
                      New Zealand Standard Time (UTC+12)
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
            <CardFooter data-oid="gfdupoc">
              <Button onClick={handleSaveAccount} data-oid="l.ko0lt">
                Save Account Settings
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="security" data-oid="81bcy14">
          <div className="grid gap-4 md:grid-cols-2" data-oid="j727mi.">
            <Card className="md:col-span-2" data-oid="2oe8gsj">
              <CardHeader data-oid="-wps0dc">
                <CardTitle data-oid="njn89n-">Security Settings</CardTitle>
                <CardDescription data-oid="idm.l.5">
                  Manage your account's security settings
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4" data-oid="c6b0o__">
                <div className="space-y-2" data-oid="luwpuev">
                  <Label htmlFor="current-password" data-oid="6_1.2qs">
                    Current Password
                  </Label>
                  <Input
                    id="current-password"
                    type="password"
                    data-oid="bj-2sls"
                  />
                </div>
                <div className="space-y-2" data-oid="9vviba8">
                  <Label htmlFor="new-password" data-oid="1ctxdbi">
                    New Password
                  </Label>
                  <Input id="new-password" type="password" data-oid="x.o9_0k" />
                </div>
                <div className="space-y-2" data-oid="exnr4:r">
                  <Label htmlFor="confirm-password" data-oid="jzo.b7u">
                    Confirm New Password
                  </Label>
                  <Input
                    id="confirm-password"
                    type="password"
                    data-oid="-9_80p2"
                  />
                </div>
                <div className="flex items-center space-x-2" data-oid="5ogg56h">
                  <Switch id="two-factor" data-oid="9qwsmqv" />
                  <Label htmlFor="two-factor" data-oid="i9d6gka">
                    Enable Two-Factor Authentication
                  </Label>
                </div>
              </CardContent>
              <CardFooter data-oid="69:6qj3">
                <Button data-oid="df5ad3g">Save Security Settings</Button>
              </CardFooter>
            </Card>

            <Card data-oid="qqvd2ox">
              <CardHeader data-oid="ilsalm4">
                <CardTitle data-oid="w1754x7">Login History</CardTitle>
                <CardDescription data-oid="v_rp9wg">
                  Recent login activities on your account
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4" data-oid=".w8h88c">
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
                    data-oid="8w0wvfa"
                  >
                    <span data-oid="3goy5kg">
                      {login.date} {login.time}
                    </span>
                    <span data-oid="oij3jd2">{login.ip}</span>
                    <span data-oid="nqgkxyo">{login.location}</span>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card data-oid="o325ryw">
              <CardHeader data-oid="b_j3554">
                <CardTitle data-oid="p47xrk0">Active Sessions</CardTitle>
                <CardDescription data-oid="2scmyza">
                  Currently active sessions on your account
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4" data-oid="3q0.fgc">
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
                    data-oid="pgaxcew"
                  >
                    <span className="flex items-center" data-oid="azsemjl">
                      <session.icon
                        className="mr-2 h-4 w-4"
                        data-oid="7gg:_cd"
                      />

                      {session.device}
                    </span>
                    <span data-oid="_yxs5c-">{session.browser}</span>
                    <span data-oid="kw4rarp">{session.os}</span>
                  </div>
                ))}
              </CardContent>
              <CardFooter data-oid="m3kiir7">
                <Button variant="outline" data-oid="kqn9si2">
                  Log Out All Other Sessions
                </Button>
              </CardFooter>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="preferences" data-oid="a0:nbcs">
          <Card data-oid="88jai00">
            <CardHeader data-oid="penhagd">
              <CardTitle data-oid="302364g">Preferences</CardTitle>
              <CardDescription data-oid="5:aaaf4">
                Customize your dashboard experience
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4" data-oid="a:3iuqi">
              <div className="grid gap-4 md:grid-cols-2" data-oid="r0b6fem">
                <div className="space-y-2" data-oid="kv_elws">
                  <Label htmlFor="language" data-oid="oczg1t-">
                    Language
                  </Label>
                  <Select defaultValue="en" data-oid="q7lwhro">
                    <SelectTrigger id="language" data-oid="wfel2wu">
                      <SelectValue
                        placeholder="Select Language"
                        data-oid="7nvch8c"
                      />
                    </SelectTrigger>
                    <SelectContent data-oid=".7iu7x5">
                      <SelectItem value="en" data-oid="clql3fe">
                        English
                      </SelectItem>
                      <SelectItem value="es" data-oid="i20074.">
                        Español
                      </SelectItem>
                      <SelectItem value="fr" data-oid="nr8.qpc">
                        Français
                      </SelectItem>
                      <SelectItem value="de" data-oid="fu2n0v8">
                        Deutsch
                      </SelectItem>
                      <SelectItem value="zh" data-oid="3kt..ns">
                        中文
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2" data-oid="52qxcfn">
                  <Label htmlFor="currency" data-oid="zykdtix">
                    Currency
                  </Label>
                  <Select defaultValue="usd" data-oid="qc2m7m6">
                    <SelectTrigger id="currency" data-oid="ulw4_rh">
                      <SelectValue
                        placeholder="Select Currency"
                        data-oid="c.fndce"
                      />
                    </SelectTrigger>
                    <SelectContent data-oid="hvz6bu.">
                      <SelectItem value="usd" data-oid="zngkpfd">
                        USD ($)
                      </SelectItem>
                      <SelectItem value="eur" data-oid="do68imw">
                        EUR (€)
                      </SelectItem>
                      <SelectItem value="gbp" data-oid="0nl-g-a">
                        GBP (£)
                      </SelectItem>
                      <SelectItem value="jpy" data-oid="v65el5u">
                        JPY (¥)
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2" data-oid="p7-2pws">
                  <Label htmlFor="date-format" data-oid="phtbpdd">
                    Date Format
                  </Label>
                  <Select defaultValue="mm-dd-yyyy" data-oid="xrpby8.">
                    <SelectTrigger id="date-format" data-oid="ovw:qxc">
                      <SelectValue
                        placeholder="Select Date Format"
                        data-oid="6nhi79p"
                      />
                    </SelectTrigger>
                    <SelectContent data-oid="d3.62z4">
                      <SelectItem value="mm-dd-yyyy" data-oid="slngsqf">
                        MM-DD-YYYY
                      </SelectItem>
                      <SelectItem value="dd-mm-yyyy" data-oid="b6uh44o">
                        DD-MM-YYYY
                      </SelectItem>
                      <SelectItem value="yyyy-mm-dd" data-oid="n4zcsdn">
                        YYYY-MM-DD
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2" data-oid="hes2jkf">
                  <Label htmlFor="font-size" data-oid="rr-tbp-">
                    Font Size
                  </Label>
                  <Slider
                    defaultValue={[16]}
                    max={24}
                    min={12}
                    step={1}
                    data-oid="xrrjs.1"
                  />
                </div>
              </div>
              <div className="space-y-2" data-oid="3did1ca">
                <Label data-oid="8kls2li">Theme</Label>
                <RadioGroup defaultValue="system" data-oid="81qh9nm">
                  <div
                    className="flex items-center space-x-2"
                    data-oid="qi:4m0m"
                  >
                    <RadioGroupItem
                      value="light"
                      id="theme-light"
                      data-oid="u5yzkur"
                    />

                    <Label htmlFor="theme-light" data-oid="zawlngf">
                      Light
                    </Label>
                  </div>
                  <div
                    className="flex items-center space-x-2"
                    data-oid="aetnc1u"
                  >
                    <RadioGroupItem
                      value="dark"
                      id="theme-dark"
                      data-oid="s1g3g6e"
                    />

                    <Label htmlFor="theme-dark" data-oid="2zgvkub">
                      Dark
                    </Label>
                  </div>
                  <div
                    className="flex items-center space-x-2"
                    data-oid="d.niur8"
                  >
                    <RadioGroupItem
                      value="system"
                      id="theme-system"
                      data-oid="2m43:4k"
                    />

                    <Label htmlFor="theme-system" data-oid="rp7t.je">
                      System
                    </Label>
                  </div>
                </RadioGroup>
              </div>
              <div className="space-y-2" data-oid="0fdll2l">
                <Label data-oid="w_zsa8l">Dashboard Layout</Label>
                <RadioGroup defaultValue="default" data-oid="gbkx_cm">
                  <div
                    className="flex items-center space-x-2"
                    data-oid="xkkmmwt"
                  >
                    <RadioGroupItem
                      value="default"
                      id="layout-default"
                      data-oid="5rxvnd."
                    />

                    <Label htmlFor="layout-default" data-oid="694a2.o">
                      Default
                    </Label>
                  </div>
                  <div
                    className="flex items-center space-x-2"
                    data-oid="aa3gew1"
                  >
                    <RadioGroupItem
                      value="compact"
                      id="layout-compact"
                      data-oid="1t5oj3z"
                    />

                    <Label htmlFor="layout-compact" data-oid="ob45zii">
                      Compact
                    </Label>
                  </div>
                  <div
                    className="flex items-center space-x-2"
                    data-oid="m17_1_g"
                  >
                    <RadioGroupItem
                      value="expanded"
                      id="layout-expanded"
                      data-oid="ckt838w"
                    />

                    <Label htmlFor="layout-expanded" data-oid="rv_a32c">
                      Expanded
                    </Label>
                  </div>
                </RadioGroup>
              </div>
            </CardContent>
            <CardFooter data-oid="yw04f3t">
              <Button data-oid="hpknph1">Save Preferences</Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="notifications" data-oid="ll2a3r4">
          <Card data-oid="vz9vz-5">
            <CardHeader data-oid="blkmrv9">
              <CardTitle data-oid="02kin93">Notification Settings</CardTitle>
              <CardDescription data-oid="6bz0bqg">
                Manage how you receive notifications
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4" data-oid="c6jt6jw">
              <div className="grid gap-4 md:grid-cols-2" data-oid="as8vrb5">
                <div className="space-y-2" data-oid="t3s4xyd">
                  <Label data-oid="t94_yno">Notification Channels</Label>
                  <div
                    className="flex items-center space-x-2"
                    data-oid="s4pytw3"
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
                      data-oid="79a7q3:"
                    />

                    <Label htmlFor="email-notifications" data-oid="r_jlbkd">
                      Email Notifications
                    </Label>
                  </div>
                  <div
                    className="flex items-center space-x-2"
                    data-oid="do4vsz-"
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
                      data-oid="8nzemic"
                    />

                    <Label htmlFor="push-notifications" data-oid="ty2rr27">
                      Push Notifications
                    </Label>
                  </div>
                  <div
                    className="flex items-center space-x-2"
                    data-oid="yd7jw2x"
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
                      data-oid="00qdhs_"
                    />

                    <Label htmlFor="sms-notifications" data-oid="3cc7_au">
                      SMS Notifications
                    </Label>
                  </div>
                </div>
                <div className="space-y-2" data-oid="kgnur3i">
                  <Label data-oid=".tmmilp">Notification Types</Label>
                  <div
                    className="flex items-center space-x-2"
                    data-oid="vtasjl6"
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
                      data-oid="pe8x_cl"
                    />

                    <Label htmlFor="account-activity" data-oid="xvfebzs">
                      Account Activity
                    </Label>
                  </div>
                  <div
                    className="flex items-center space-x-2"
                    data-oid="ma2u1os"
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
                      data-oid="p2d0ce6"
                    />

                    <Label htmlFor="new-features" data-oid=".:cn9rn">
                      New Features and Updates
                    </Label>
                  </div>
                  <div
                    className="flex items-center space-x-2"
                    data-oid="o8hixy4"
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
                      data-oid="85er-df"
                    />

                    <Label htmlFor="marketing" data-oid="tygwfl7">
                      Marketing and Promotions
                    </Label>
                  </div>
                </div>
              </div>
              <div className="space-y-2" data-oid="5-gzhbm">
                <Label htmlFor="notification-frequency" data-oid="66ywuc8">
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
                  data-oid="vft1o0f"
                >
                  <SelectTrigger id="notification-frequency" data-oid="qvp--xu">
                    <SelectValue
                      placeholder="Select Frequency"
                      data-oid="39cn4hi"
                    />
                  </SelectTrigger>
                  <SelectContent data-oid="c.rn2ef">
                    <SelectItem value="real-time" data-oid="2wiyj79">
                      Real-time
                    </SelectItem>
                    <SelectItem value="daily" data-oid="mw_48xn">
                      Daily Digest
                    </SelectItem>
                    <SelectItem value="weekly" data-oid="18qwx-9">
                      Weekly Summary
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2" data-oid="szoa-11">
                <Label htmlFor="quiet-hours-start" data-oid="c.5qi5o">
                  Quiet Hours
                </Label>
                <div className="flex items-center space-x-2" data-oid=":hzxvpk">
                  <Input
                    id="quiet-hours-start"
                    type="time"
                    defaultValue="22:00"
                    data-oid="a:qdfkr"
                  />

                  <span data-oid="feoyk-s">to</span>
                  <Input
                    id="quiet-hours-end"
                    type="time"
                    defaultValue="07:00"
                    data-oid=":z0tgmb"
                  />
                </div>
              </div>
            </CardContent>
            <CardFooter data-oid="_gl.z:r">
              <Button onClick={handleSaveNotifications} data-oid="ut-:h5q">
                Save Notification Settings
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="privacy" data-oid="jlno2k1">
          <Card data-oid="v1jo8oi">
            <CardHeader data-oid="7gta_b0">
              <CardTitle data-oid="hfbvbu8">Privacy Settings</CardTitle>
              <CardDescription data-oid="_6prf1j">
                Manage your privacy and data settings
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6" data-oid="bwig_8z">
              <div className="grid gap-4 md:grid-cols-2" data-oid="6:wu-e:">
                <Card data-oid="s5wr8xf">
                  <CardHeader data-oid="26.rs78">
                    <CardTitle className="text-lg" data-oid="v9q_8rm">
                      Data Sharing
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2" data-oid="utemja5">
                    <div
                      className="flex items-center justify-between"
                      data-oid="n81i3tc"
                    >
                      <Label htmlFor="analytics-sharing" data-oid="h.kcgk2">
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
                        data-oid="0.wlkwm"
                      />
                    </div>
                    <div
                      className="flex items-center justify-between"
                      data-oid="2zo4dpj"
                    >
                      <Label htmlFor="personalized-ads" data-oid="zjmd9z4">
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
                        data-oid="a43lh7f"
                      />
                    </div>
                  </CardContent>
                </Card>
                <Card data-oid=".tlpk4l">
                  <CardHeader data-oid="0gmaalb">
                    <CardTitle className="text-lg" data-oid="bq1koer">
                      Account Visibility
                    </CardTitle>
                  </CardHeader>
                  <CardContent data-oid="q8jjo31">
                    <RadioGroup
                      value={settings.privacy.visibility}
                      onValueChange={(value) =>
                        updatePrivacySettings({
                          ...settings.privacy,
                          visibility: value,
                        })
                      }
                      data-oid="hh62cfb"
                    >
                      <div
                        className="flex items-center space-x-2"
                        data-oid="lkbyweg"
                      >
                        <RadioGroupItem
                          value="public"
                          id="visibility-public"
                          data-oid="i1yquzi"
                        />

                        <Label htmlFor="visibility-public" data-oid="855z0m:">
                          Public
                        </Label>
                      </div>
                      <div
                        className="flex items-center space-x-2"
                        data-oid="whi2tk7"
                      >
                        <RadioGroupItem
                          value="private"
                          id="visibility-private"
                          data-oid="u30k0ip"
                        />

                        <Label htmlFor="visibility-private" data-oid="4zjyi3h">
                          Private
                        </Label>
                      </div>
                    </RadioGroup>
                  </CardContent>
                </Card>
              </div>
              <div className="grid gap-4 md:grid-cols-2" data-oid="4vp1.qh">
                <Card data-oid="qyeg-6_">
                  <CardHeader data-oid="ro0tw.6">
                    <CardTitle className="text-lg" data-oid="y-0:5t7">
                      Data Retention
                    </CardTitle>
                  </CardHeader>
                  <CardContent data-oid="20fd6bo">
                    <Select
                      value={settings.privacy.dataRetention}
                      onValueChange={(value) =>
                        updatePrivacySettings({
                          ...settings.privacy,
                          dataRetention: value,
                        })
                      }
                      data-oid="xe4ov69"
                    >
                      <SelectTrigger id="data-retention" data-oid="hkx0h92">
                        <SelectValue
                          placeholder="Select Data Retention Period"
                          data-oid="grj0aqf"
                        />
                      </SelectTrigger>
                      <SelectContent data-oid=".hilk36">
                        <SelectItem value="6-months" data-oid="_d-58i-">
                          6 Months
                        </SelectItem>
                        <SelectItem value="1-year" data-oid="fn0-iw0">
                          1 Year
                        </SelectItem>
                        <SelectItem value="2-years" data-oid="prqk1z:">
                          2 Years
                        </SelectItem>
                        <SelectItem value="indefinite" data-oid="yfnx191">
                          Indefinite
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </CardContent>
                </Card>
                <Card data-oid="sek1t-p">
                  <CardHeader data-oid="xig0kq:">
                    <CardTitle className="text-lg" data-oid="c:woghf">
                      Third-Party Integrations
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2" data-oid="kqmsm-z">
                    <p
                      className="text-sm text-muted-foreground"
                      data-oid="709xe1o"
                    >
                      Connected: Google Analytics, Facebook Pixel
                    </p>
                    <Button variant="outline" data-oid="5udib93">
                      Manage Integrations
                    </Button>
                  </CardContent>
                </Card>
              </div>
              <div className="flex justify-between" data-oid="jf-ke86">
                <Button variant="outline" data-oid="weg4jd0">
                  Download Your Data
                </Button>
                <Button variant="destructive" data-oid="1zczitv">
                  Delete My Account
                </Button>
              </div>
            </CardContent>
            <CardFooter data-oid="f1x4gcm">
              <Button onClick={handleSavePrivacy} data-oid="m16.ect">
                Save Privacy Settings
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
