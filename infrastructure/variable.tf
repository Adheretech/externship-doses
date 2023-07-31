variable "cluster_name" {
  type    = string
  default = "default"
}

variable "description" {
  type    = string
  default = "Cluster for AdhereTech's externship."
}

variable "gke_version" {
  type    = string
  default = "1.23.14-gke.1800"
}

variable "gke_maintenance_window" {
  type    = string
  default = "05:00"
}

variable "node_version" {
  type    = string
  default = "1.23.14-gke.1800"
}

variable "region" {
  type    = string
  default = "us-east1-d"
}

variable "zone" {
  type    = string
  default = "us-east1-d"
}

variable "location" {
  type    = string
  default = "us-east1"
}

variable "node_pool_name" {
  type    = string
  default = "node-pool"
}

variable "initial_node_count" {
  type    = number
  default = 1
}

variable "max_node_count" {
  type    = number
  default = 3
}

variable "node_machine_type" {
  type    = string
  default = "n1-standard-8"
}

variable "image_type" {
  type    = string
  default = "COS"
}

variable "disk_type" {
  type    = string
  default = "pd-standard"
}

variable "default_disk_size" {
  type    = number
  default = 100
}

variable "network" {
  type    = string
  default = "default"
}

variable "subnetwork" {
  type    = string
  default = "default"
}

variable "networking_mode" {
  type    = string
  default = "ROUTES"
}

variable "cluster_ipv4_cidr" {
  type = string
  default = "10.8.0.0/14"
}

variable "services_ipv4_cidr_block" {
  type = string
  default = "10.8.0.0/14"
}

variable "externship_range" {
  type    = string
  default = "192.168.100.0/24"
}

variable "externship_pod_ranges" {
  type    = string
  default = "192.168.64.0/22"
}
