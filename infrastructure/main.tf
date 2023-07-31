provider "google" {
  project = "externships"
  region  = var.region
}

terraform {

  backend "gcs" {
    bucket = "at-externship-infrastructure"
    prefix = "dose-tracker"
  }

  required_providers {
    google = {
      source  = "hashicorp/google-beta"
      version = "4.50.0"
    }
  }
}

resource "google_container_cluster" "cluster" {
  addons_config {
    horizontal_pod_autoscaling {
      disabled = false
    }

    http_load_balancing {
      disabled = false
    }

    network_policy_config {
      disabled = true
    }
  }

  binary_authorization {
    evaluation_mode = "DISABLED"
  }

  ip_allocation_policy {
    cluster_secondary_range_name  = google_compute_subnetwork.externship.secondary_ip_range.0.range_name
    services_secondary_range_name = google_compute_subnetwork.externship.secondary_ip_range.1.range_name
  }

  default_snat_status {
    disabled = false
  }

  description                 = var.description
  enable_intranode_visibility = false
  enable_kubernetes_alpha     = false
  enable_legacy_abac          = true
  enable_shielded_nodes       = false
  enable_tpu                  = false
  remove_default_node_pool    = true
  initial_node_count          = 1
  network                     = google_compute_network.externship.id
  subnetwork                  = google_compute_subnetwork.externship.id
  location                    = var.zone

  logging_config {
    enable_components = ["SYSTEM_COMPONENTS", "WORKLOADS"]
  }

  maintenance_policy {
    daily_maintenance_window {
      start_time = "05:00"
    }
  }

  master_auth {
    client_certificate_config {
      issue_client_certificate = true
    }
  }

  monitoring_config {
    enable_components = ["SYSTEM_COMPONENTS"]

    managed_prometheus {
      enabled = true
    }
  }

  name = "externship"

  network_policy {
    enabled  = false
    provider = "CALICO"
  }

  networking_mode = "ROUTES"

  private_cluster_config {
    enable_private_endpoint = false
    enable_private_nodes    = false

    master_global_access_config {
      enabled = false
    }
  }

  project = "externships"

  release_channel {
    channel = "STABLE"
  }

  vertical_pod_autoscaling {
    enabled = true
  }

  lifecycle {
    ignore_changes = [
      ip_allocation_policy,
      network_policy
    ]
    prevent_destroy = false
  }

}

resource "google_container_node_pool" "externship_pool" {
  name       = "externship-pool"
  location   = "us-east1-d"
  cluster    = google_container_cluster.cluster.name
  node_count = 1

  upgrade_settings {
    strategy = "BLUE_GREEN"

    blue_green_settings {
      node_pool_soak_duration = "5s"
      standard_rollout_policy {
        batch_soak_duration = "5s"
      }
    }
  }

  node_config {
    preemptible     = false
    machine_type    = "e2-medium"
    service_account = google_service_account.gke_default.email
  }

  network_config {
    enable_private_nodes = false
  }
}

resource "google_service_account" "gke_default" {
  account_id   = "externship-sa"
  display_name = "Externship Kubernetes Service Account"

  description = "Service Account for powering the externship project."
}

resource "google_service_account_key" "gke_default" {
  service_account_id = google_service_account.gke_default.name

  private_key_type = "TYPE_GOOGLE_CREDENTIALS_FILE"
  public_key_type  = "TYPE_X509_PEM_FILE"
}

resource "google_project_iam_member" "auth" {
  for_each = toset([
    "roles/artifactregistry.reader",
    "roles/containerregistry.ServiceAgent",
    "roles/owner"
  ])

  project = "externships"
  role    = each.value
  member  = "serviceAccount:${google_service_account.gke_default.email}"
}

resource "google_compute_network" "externship" {
  name                    = "externship"
  auto_create_subnetworks = false
}

resource "google_compute_subnetwork" "externship" {
  name          = "mentorship"
  ip_cidr_range = var.cluster_ipv4_cidr
  region        = "us-east1"
  network       = google_compute_network.externship.id
  secondary_ip_range {
    range_name    = "externship-range"
    ip_cidr_range = var.externship_range
  }

  secondary_ip_range {
    range_name    = "externship-pod-ranges"
    ip_cidr_range = var.externship_pod_ranges
  }
}

resource "google_compute_address" "externship" {
  name   = "externship-access-k8s-lb"
  region = "us-east1"
}