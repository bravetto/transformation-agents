"use client";

import { useDevPortal } from "@/components/dev-portal";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useEffect, useState } from "react";

export default function DevPortalTestPage() {
  const { isUnlocked, isOpen, togglePortal, lockPortal } = useDevPortal();
  const [localStorageValue, setLocalStorageValue] = useState<string | null>(
    null,
  );

  useEffect(() => {
    // Only access localStorage on client side
    setLocalStorageValue(localStorage.getItem("dev-portal-unlocked"));
  }, [isUnlocked]);

  const forceUnlock = () => {
    localStorage.setItem("dev-portal-unlocked", "true");
    window.location.reload();
  };

  const clearStorage = () => {
    localStorage.removeItem("dev-portal-unlocked");
    window.location.reload();
  };

  return (
    <div className="min-h-screen p-8 bg-gray-900 text-white">
      <h1 className="text-3xl font-bold mb-8">Dev Portal Test Page</h1>

      <Card className="p-6 bg-gray-800 border-gray-700 max-w-2xl">
        <h2 className="text-xl font-semibold mb-4">Portal Status</h2>
        <div className="space-y-2 mb-6">
          <p>
            Unlocked:{" "}
            <span className={isUnlocked ? "text-green-400" : "text-red-400"}>
              {isUnlocked ? "Yes ✅" : "No ❌"}
            </span>
          </p>
          <p>
            Open:{" "}
            <span className={isOpen ? "text-green-400" : "text-red-400"}>
              {isOpen ? "Yes ✅" : "No ❌"}
            </span>
          </p>
          <p>
            LocalStorage:{" "}
            <code className="bg-gray-700 px-2 py-1 rounded">
              {localStorageValue || "null"}
            </code>
          </p>
        </div>

        <div className="space-y-4">
          <div className="space-x-2">
            <Button onClick={forceUnlock} variant="default">
              Force Unlock
            </Button>
            <Button onClick={clearStorage} variant="destructive">
              Clear Storage
            </Button>
            {isUnlocked && (
              <>
                <Button onClick={togglePortal} variant="secondary">
                  Toggle Portal
                </Button>
                <Button onClick={lockPortal} variant="outline">
                  Lock Portal
                </Button>
              </>
            )}
          </div>

          <div className="mt-6 p-4 bg-gray-700 rounded">
            <h3 className="font-semibold mb-2">Instructions:</h3>
            <ol className="list-decimal list-inside space-y-1 text-sm">
              <li>If Konami code isn't working, click "Force Unlock"</li>
              <li>After force unlock, refresh the page</li>
              <li>You should see the terminal icon bottom-right</li>
              <li>Try Ctrl+Shift+D or click the terminal icon</li>
            </ol>
          </div>

          <div className="mt-4 p-4 bg-blue-900/30 rounded">
            <h3 className="font-semibold mb-2">Konami Code:</h3>
            <p className="font-mono text-lg">↑ ↑ ↓ ↓ ← → ← → B A</p>
            <p className="text-sm text-gray-400 mt-2">
              Type this sequence anywhere on the page
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
}
