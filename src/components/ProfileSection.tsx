"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

const ROLES = [
  { value: "founder",    label: "Founder / Builder" },
  { value: "investor",   label: "Investor / VC" },
  { value: "policy",     label: "Policy / Government" },
  { value: "researcher", label: "Researcher / Academic" },
  { value: "operator",   label: "Cloud / DC Operator" },
  { value: "other",      label: "Other" },
];
import { motion } from "framer-motion";
import { createClient } from "@/lib/supabase/client";
import { getPasswordStrength, STRENGTH_CONFIG } from "@/lib/passwordStrength";

const LABEL = "block text-[11px] uppercase tracking-widest mb-1.5 font-normal";

const inputBase: React.CSSProperties = {
  width: "100%",
  padding: "10px 14px",
  borderRadius: "12px",
  fontSize: "13px",
  color: "#222f30",
  backgroundColor: "#fff",
  border: "1px solid rgba(34,47,48,0.14)",
  outline: "none",
  transition: "border-color 0.15s",
};

const readonlyBase: React.CSSProperties = {
  ...inputBase,
  backgroundColor: "rgba(34,47,48,0.03)",
  color: "rgba(34,47,48,0.45)",
  borderColor: "rgba(34,47,48,0.08)",
};

function Card({ children, style }: { children: React.ReactNode; style?: React.CSSProperties }) {
  return (
    <div
      className="rounded-2xl p-6"
      style={{ backgroundColor: "#fff", border: "1px solid rgba(34,47,48,0.08)", ...style }}
    >
      {children}
    </div>
  );
}

function SaveButton({ loading, label, loadingLabel }: { loading: boolean; label: string; loadingLabel: string }) {
  return (
    <button
      type="submit"
      disabled={loading}
      className="w-full py-2.5 rounded-xl text-[13px] font-normal transition-all duration-200 hover:-translate-y-0.5 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0 flex items-center justify-center gap-2"
      style={{ backgroundColor: "#222f30", color: "#fff" }}
    >
      {loading ? (
        <>
          <svg className="animate-spin" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M21 12a9 9 0 1 1-6.219-8.56" />
          </svg>
          {loadingLabel}
        </>
      ) : label}
    </button>
  );
}

export default function ProfileSection() {
  const supabase = createClient();
  const router = useRouter();

  const [name, setName]   = useState("");
  const [org,  setOrg]    = useState("");
  const [role, setRole]   = useState("");
  const [email, setEmail] = useState("");

  const [profileLoading, setProfileLoading]   = useState(false);
  const [profileSuccess, setProfileSuccess]   = useState(false);
  const [profileError,   setProfileError]     = useState("");

  const [newPassword,     setNewPassword]     = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordLoading, setPasswordLoading] = useState(false);
  const [passwordSuccess, setPasswordSuccess] = useState(false);
  const [passwordError,   setPasswordError]   = useState("");

  const strengthScore = getPasswordStrength(newPassword);
  const strengthInfo  = STRENGTH_CONFIG[strengthScore];

  useEffect(() => {
    supabase.auth.getUser().then(({ data: { user } }) => {
      if (!user) return;
      setEmail(user.email ?? "");
      setName((user.user_metadata?.name  as string) ?? "");
      setOrg( (user.user_metadata?.org   as string) ?? "");
      setRole((user.user_metadata?.role  as string) ?? "");
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function handleProfileSave(e: React.FormEvent) {
    e.preventDefault();
    setProfileError(""); setProfileSuccess(false); setProfileLoading(true);
    const { error } = await supabase.auth.updateUser({ data: { name, org, role } });
    if (error) { setProfileError(error.message); }
    else { setProfileSuccess(true); setTimeout(() => setProfileSuccess(false), 3000); }
    setProfileLoading(false);
  }

  async function handlePasswordChange(e: React.FormEvent) {
    e.preventDefault();
    setPasswordError(""); setPasswordSuccess(false);
    if (newPassword.length < 8)          { setPasswordError("Password must be at least 8 characters."); return; }
    if (newPassword !== confirmPassword) { setPasswordError("Passwords do not match."); return; }
    setPasswordLoading(true);
    const { error } = await supabase.auth.updateUser({ password: newPassword });
    if (error) { setPasswordError(error.message); }
    else {
      setPasswordSuccess(true);
      setNewPassword(""); setConfirmPassword("");
      setTimeout(() => setPasswordSuccess(false), 3000);
    }
    setPasswordLoading(false);
  }

  function focusBorder(e: React.FocusEvent<HTMLInputElement>) {
    e.currentTarget.style.borderColor = "#222f30";
  }
  function blurBorder(e: React.FocusEvent<HTMLInputElement>) {
    e.currentTarget.style.borderColor = "rgba(34,47,48,0.14)";
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
      className="max-w-[520px] mx-auto flex flex-col gap-5"
    >

      {/* ── Account details ── */}
      <Card>
        <h2 className="text-[15px] font-medium tracking-[-0.02em] mb-5" style={{ color: "#222f30" }}>
          Account details
        </h2>

        <div className="mb-4">
          <label className={LABEL} style={{ color: "rgba(34,47,48,0.4)" }}>Email</label>
          <div style={readonlyBase}>{email || "—"}</div>
        </div>

        <form onSubmit={handleProfileSave} className="flex flex-col gap-4">
          <div>
            <label className={LABEL} style={{ color: "rgba(34,47,48,0.4)" }}>Full name</label>
            <input type="text" value={name} onChange={(e) => setName(e.target.value)}
              placeholder="Your name" style={inputBase}
              onFocus={focusBorder} onBlur={blurBorder} />
          </div>
          <div>
            <label className={LABEL} style={{ color: "rgba(34,47,48,0.4)" }}>Organisation</label>
            <input type="text" value={org} onChange={(e) => setOrg(e.target.value)}
              placeholder="Company or organisation" style={inputBase}
              onFocus={focusBorder} onBlur={blurBorder} />
          </div>
          <div>
            <label className={LABEL} style={{ color: "rgba(34,47,48,0.4)" }}>Role</label>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              style={{
                ...inputBase,
                cursor: "pointer",
                appearance: "none",
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='12' height='8' viewBox='0 0 12 8' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1 1L6 6L11 1' stroke='%23222f30' stroke-opacity='0.35' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E")`,
                backgroundRepeat: "no-repeat",
                backgroundPosition: "right 14px center",
                paddingRight: "36px",
                color: role ? "#222f30" : "rgba(34,47,48,0.4)",
              }}
              onFocus={(e) => { e.currentTarget.style.borderColor = "#222f30"; }}
              onBlur={(e) => { e.currentTarget.style.borderColor = "rgba(34,47,48,0.14)"; }}
            >
              <option value="" disabled>Select your role</option>
              {ROLES.map((r) => (
                <option key={r.value} value={r.value}>{r.label}</option>
              ))}
            </select>
          </div>

          {profileError   && <p className="text-[12px]" style={{ color: "#dc2626" }}>{profileError}</p>}
          {profileSuccess && <p className="text-[12px]" style={{ color: "#059669" }}>Profile updated.</p>}

          <SaveButton loading={profileLoading} label="Save changes" loadingLabel="Saving…" />
        </form>
      </Card>

      {/* ── Change password ── */}
      <Card>
        <h2 className="text-[15px] font-medium tracking-[-0.02em] mb-5" style={{ color: "#222f30" }}>
          Change password
        </h2>

        <form onSubmit={handlePasswordChange} className="flex flex-col gap-4">
          <div>
            <label className={LABEL} style={{ color: "rgba(34,47,48,0.4)" }}>New password</label>
            <input type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)}
              placeholder="Min. 8 characters" required style={inputBase}
              onFocus={focusBorder} onBlur={blurBorder} />
            {newPassword.length > 0 && (
              <div className="mt-2">
                <div className="h-1 w-full rounded-full overflow-hidden" style={{ backgroundColor: "rgba(34,47,48,0.08)" }}>
                  <div className="h-full rounded-full transition-all duration-300"
                    style={{ width: strengthInfo.width, backgroundColor: strengthInfo.color }} />
                </div>
                <p className="text-[11px] mt-1 transition-colors duration-300" style={{ color: strengthInfo.color }}>
                  {strengthInfo.label}
                </p>
              </div>
            )}
          </div>
          <div>
            <label className={LABEL} style={{ color: "rgba(34,47,48,0.4)" }}>Confirm new password</label>
            <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Repeat password" required style={inputBase}
              onFocus={focusBorder} onBlur={blurBorder} />
          </div>

          {passwordError   && <p className="text-[12px]" style={{ color: "#dc2626" }}>{passwordError}</p>}
          {passwordSuccess && <p className="text-[12px]" style={{ color: "#059669" }}>Password updated successfully.</p>}

          <SaveButton loading={passwordLoading} label="Update password" loadingLabel="Updating…" />
        </form>
      </Card>

      {/* ── Plan badge ── */}
      <div
        className="rounded-2xl px-6 py-4 flex items-center justify-between"
        style={{ backgroundColor: "#fff", border: "1px solid rgba(34,47,48,0.08)" }}
      >
        <div>
          <p className="text-[13px] font-medium" style={{ color: "#222f30" }}>Current plan</p>
          <p className="text-[12px] font-light mt-0.5" style={{ color: "rgba(34,47,48,0.45)" }}>
            Access to all markets and features
          </p>
        </div>
        <span
          className="text-[11px] font-medium px-3 py-1 rounded-full"
          style={{
            backgroundColor: "rgba(34,197,94,0.09)",
            color: "#16a34a",
            border: "1px solid rgba(34,197,94,0.2)",
          }}
        >
          Pro · Beta
        </span>
      </div>

      {/* ── Sign out (mobile only) ── */}
      <button
        onClick={async () => { await supabase.auth.signOut(); router.push("/login"); router.refresh(); }}
        className="lg:hidden w-full py-2.5 rounded-xl text-[13px] font-normal transition-all duration-200 hover:opacity-80 cursor-pointer"
        style={{ backgroundColor: "rgba(239,68,68,0.07)", color: "#dc2626", border: "1px solid rgba(239,68,68,0.15)" }}
      >
        Sign out
      </button>

      <div className="h-4 lg:h-0" />
    </motion.div>
  );
}
