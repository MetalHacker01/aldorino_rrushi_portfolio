import { useState, type ReactNode } from "react";
import TitleBar from "./TitleBar";
import IdentityStrip from "./IdentityStrip";
import Explorer from "./Explorer";
import StatusBar from "./StatusBar";
import MobileBottomNav from "./MobileBottomNav";
import BootSequence from "./BootSequence";
import { useActiveSection } from "@/v2/hooks/useActiveSection";
import { useBootSeen } from "@/v2/hooks/useBootSeen";
import { useLatestCommit } from "@/v2/hooks/useLatestCommit";

const SECTION_IDS = ["about", "experience", "projects", "certs", "ai", "contact"];

type Props = {
  children: ReactNode;
  showSidebars?: boolean;
};

const IDEShell = ({ children, showSidebars = true }: Props) => {
  const activeId = useActiveSection(SECTION_IDS);
  const { shouldBoot, markSeen } = useBootSeen();
  const latestCommit = useLatestCommit();
  const [mobileExplorerOpen, setMobileExplorerOpen] = useState(false);

  return (
    <div
      className="v2-root"
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100dvh",
        background: "var(--v2-bg-app)",
        color: "var(--v2-text)",
      }}
    >
      {shouldBoot && <BootSequence onDone={markSeen} />}

      <TitleBar />
      <IdentityStrip />

      <div style={{ display: "flex", flex: 1, minHeight: 0 }}>
        {showSidebars && (
          <>
            <div className="hide-sm">
              <Explorer activeId={activeId} />
            </div>
            {mobileExplorerOpen && (
              <div
                role="dialog"
                aria-modal="true"
                style={{
                  position: "fixed",
                  inset: 0,
                  background: "rgba(0,0,0,0.6)",
                  zIndex: 50,
                  display: "flex",
                }}
                onClick={() => setMobileExplorerOpen(false)}
              >
                <div onClick={(e) => e.stopPropagation()}>
                  <Explorer activeId={activeId} onNavigate={() => setMobileExplorerOpen(false)} />
                </div>
              </div>
            )}
          </>
        )}

        <main
          style={{
            flex: 1,
            overflowY: "auto",
            minWidth: 0,
            padding: "0 24px",
            scrollBehavior: "smooth",
          }}
        >
          <div style={{ maxWidth: 720, margin: "0 auto", padding: "32px 0" }}>{children}</div>
        </main>

      </div>

      <div className="hide-sm">
        <StatusBar activeId={activeId} latestCommit={latestCommit} />
      </div>

      {showSidebars && <MobileBottomNav activeId={activeId} />}
    </div>
  );
};

export default IDEShell;
