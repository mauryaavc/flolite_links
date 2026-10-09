// Full base = `${ROOT}/${warehouseId}` (warehouse id lowercase)
export const ROOT = 'http://10.24.1.71/flo-lite'

// [text, path] pairs keep the data compact
const i = (rows) => rows.map(([text, path]) => ({ text, path }))

export const tiles = [
  {
    name: 'Inbound', icon: '📥', path: '/',
    sections: [
      { label: 'Raas Consignment Actions', items: i([
        ['Report at Gate', '/hl/inbound/raas/report-at-gate'],
        ['Invoice at Gate', '/hl/inbound/raas/invoice-at-gate'],
        ['Start Unload', '/hl/inbound/raas/start-unload'],
        ['Stop Unload', '/hl/inbound/raas/stop-unload'],
        ['Print POD', '/hl/inbound/raas/print-pod'],
        ['Close SR', '/hl/inbound/raas/close-sr'],
        ['Invoice / POD required', '/hl/inbound/raas/invoice-pod-required'],
        ['Reject Document', '/hl/inbound/raas/reject-document'],
      ]) },
      { label: 'Other', items: i([
        ['Receive IWIT', '/hl/inbound/receive-iwit'],
        ['Receive', '/hl/inbound/receive'],
        ['Attach / Detach', '/hl/inbound/attach-detach'],
        ['Create Put List From Tote', '/hl/inbound/create-putlist-from-tote'],
      ]) },
    ],
  },
  {
    name: 'Put Away', icon: '🔙', path: '/putaway',
    sections: [{ label: 'Tasks', items: i([
      ['View Tote', '/hl/putaway/view-tote'],
      ['Putaway Tasks', '/hl/putaway/tasks'],
      ['Self Assign Totes', '/hl/putaway/self-assign-totes'],
      ['Create Putlist', '/hl/putaway/create-putlist'],
      ['Close Putlist', '/hl/putaway/close-putlist'],
    ]) }],
  },
  {
    name: 'Kalash Inbound', icon: '📦', path: '/inbound',
    sections: [{ label: 'Inbound Operations', items: i([
      ['MORS Operations [Admin only]', '/inbound/mors-operations'],
      ['Receive ( FSN Search & QC )', '/inbound/receive-fsn-search-qc'],
      ['Close LU', '/inbound/close-lu'],
      ['Drop LU', '/inbound/drop-lu'],
      ['Transfer Items & Create Putlist', '/inbound/transfer-items-create-putlist'],
      ['Create putlist from tote', '/inbound/create-putlist-from-tote'],
      ['HU size definition', '/inbound/hu-size-definition'],
      ['HU Reconciliation', '/inbound/hu-reconciliation'],
      ['Pallet Reconciliation', '/inbound/pallet-reconciliation'],
      ['PL Creation for IWIT/FA/RC', '/inbound/pl-creation-iwit-fa-rc'],
      ['Legacy Conveyor Putaway', '/inbound/legacy-conveyor-putaway'],
    ]) }],
  },
  {
    name: 'Kalash LU', icon: '🏗️', path: '/kalash-lu',
    sections: [{ label: 'Load Unit Operations', items: i([
      ['Generate Load units', '/kalash-lu/generate-load-units'],
      ['Drop Load units', '/kalash-lu/drop-load-units'],
      ['Close Load units', '/kalash-lu/close-load-units'],
      ['View Load units', '/kalash-lu/view-load-units'],
      ['View Consignment', '/kalash-lu/view-consignment'],
    ]) }],
  },
  {
    name: 'Customer outbound', icon: '📤', path: '/hl/outbound',
    sections: [
      { label: 'Grocery outbound', items: i([
        ['Smart QC', '/hl/outbound/smart-qc'],
        ['Grocery Pack', '/hl/outbound/grocery-pack'],
      ]) },
      { label: 'Kalash outbound', items: i([['Pack Station SBS', '/hl/outbound/pack-station-sbs']]) },
      { label: 'Task Inbox', items: i([['Picking Inbox', '/hl/outbound/picking-inbox']]) },
      { label: 'Self serves', items: i([
        ['Packaging Self Serve', '/hl/outbound/packaging-self-serve'],
        ['Self Serve Picker Blacklisting', '/hl/outbound/self-serve-picker-blacklisting'],
      ]) },
    ],
  },
  {
    name: 'Non Customer outbound', icon: '🚀', path: '/ncob',
    sections: [
      { label: 'Kalash IWIT Outbound', items: i([
        ['Existing L2 to continue', '/ncob/existing-l2-to-continue'],
        ['Add mimic handover to the L2 list above', '/ncob/add-mimic-handover'],
      ]) },
      { label: 'Task Inbox', items: i([['Picking Inbox', '/ncob/picking-inbox']]) },
      { label: 'Desktop Flows', items: i([
        ['View & Assign Transfer List', '/ncob/view-assign-transfer-list'],
        ['View Box details', '/ncob/view-box-details'],
        ['Find Outbound Requests', '/ncob/find-outbound-requests'],
        ['Unplanned Load & Create TL', '/ncob/unplanned-load-create-tl'],
        ['View Blocked Requests', '/ncob/view-blocked-requests'],
      ]) },
      { label: 'Outbound Activities', items: i([
        ['Packaging & QC', '/ncob/packaging-qc'],
        ['Dispatch Box', '/ncob/dispatch-box'],
        ['View Box', '/ncob/view-box'],
      ]) },
    ],
  },
  {
    name: 'Desktop Flows', icon: '🖥️', path: '/desktop',
    sections: [{ label: 'All Flows', items: i([
      ['Pre-picking and order visibility', '/desktop/pre-picking-order-visibility'],
      ['Inbound Consignment details', '/desktop/inbound-consignment-details'],
      ['Unplanned Load', '/desktop/unplanned-load'],
      ['Sampling Inbound', '/desktop/sampling-inbound'],
      ['Find TaaS Consignment', '/desktop/find-taas-consignment'],
      ['Create Store Picklist', '/desktop/create-store-picklist'],
      ['Inbound CSV Upload', '/desktop/inbound-csv-upload'],
      ['IWIT Dashboard', '/desktop/iwit-dashboard'],
      ['Find Shipments', '/desktop/find-shipments'],
      ['Putaway Dashboard', '/desktop/putaway-dashboard'],
      ['Fresh Consignment Dashboard', '/desktop/fresh-consignment-dashboard'],
      ['Fresh Document Dashboard', '/desktop/fresh-document-dashboard'],
    ]) }],
  },
  {
    name: 'Inventory View', icon: '🔍', path: '/inventory',
    sections: [{ label: 'Scan Tool', items: i([
      ['Scan or Enter transient location (direct tool)', '/inventory'],
    ]) }],
  },
  {
    name: 'Hyper Local', icon: '📍', path: '/hl',
    sections: [
      { label: 'Admin Tasks', items: i([
        ['Picker Status', '/hl/admin/picker-status'],
        ['HL inbound', '/hl/admin/hl-inbound'],
        ['Direct Procurement', '/hl/admin/direct-procurement'],
      ]) },
      { label: 'Raas Consignment Actions', items: i([
        ['QC and Putaway', '/hl/raas/qc-and-putaway'],
        ['IWIT', '/hl/raas/iwit'],
      ]) },
      { label: 'Return centre', items: i([
        ['Receive Shipment', '/hl/return-centre/receive-shipment'],
        ['Shipment PV and Putaway', '/hl/return-centre/shipment-pv-putaway'],
      ]) },
      { label: 'Customer outbound', items: i([
        ['Task Inbox Screen', '/hl/outbound/task-inbox-screen'],
        ['Darkstore live dashboard', '/hl/outbound/darkstore-live-dashboard'],
        ['Pendency Screen', '/hl/outbound/pendency-screen'],
        ['RC Pendency', '/hl/outbound/rc-pendency'],
        ['IWIT/Direct Pendency Dashboard', '/hl/outbound/iwit-direct-pendency-dashboard'],
        ['Review Stock Take', '/hl/outbound/review-stock-take'],
        ['Cancel GTL', '/hl/outbound/cancel-gtl'],
        ['Cancel TTL', '/hl/outbound/cancel-ttl'],
        ['Inbound Consignment Details', '/hl/outbound/inbound-consignment-details'],
        ['Non-ATP Dashboard', '/hl/outbound/non-atp-dashboard'],
        ['IWIT Inbound Live Dashboard', '/hl/outbound/iwit-inbound-live-dashboard'],
        ['Pigeon Hole Pendency', '/hl/outbound/pigeon-hole-pendency'],
        ['Find Shipments', '/hl/outbound/find-shipments'],
        ['Find Picklist', '/hl/outbound/find-picklist'],
      ]) },
      { label: 'HL Inventory', items: i([
        ['Print Label', '/hl/inventory/print-label'],
        ['Stock Take', '/hl/inventory/stock-take'],
        ['GTL', '/hl/inventory/gtl'],
        ['TTL', '/hl/inventory/ttl'],
        ['Excess Inventory', '/hl/inventory/excess-inventory'],
        ['View Inventory', '/hl/inventory/view-inventory'],
      ]) },
      { label: 'NCOB Outbound', items: i([
        ['Dispatch Consignment', '/hl/ncob/dispatch-consignment'],
        ['IWIT', '/hl/ncob/iwit'],
        ['External Liquidation', '/hl/ncob/external-liquidation'],
        ['Supplier Return With Area', '/hl/ncob/supplier-return-with-area'],
        ['Vendor Return', '/hl/ncob/vendor-return'],
      ]) },
      { label: 'Assets', items: i([
        ['Execute Bag Stocktake', '/hl/assets/execute-bag-stocktake'],
        ['Pigeon Hole Pendency', '/hl/assets/pigeon-hole-pendency'],
        ['Asset Logs', '/hl/assets/asset-logs'],
        ['Onboard Bags', '/hl/assets/onboard-bags'],
      ]) },
    ],
  },
]
