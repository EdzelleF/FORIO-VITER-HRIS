<?php

class Department {
    public $department_aid;
    public $department_is_active;
    public $department_name;
    public $department_created;
    public $department_updated;

    public $search;
    public $start;
    public $total;

    public $connection;
    public $tblDepartment;

    public function __construct($db) {
        $this->connection = $db;
        $this->tblDepartment = "settings_department";
    }

    public function create() {
        try {
            $sql = "insert into {$this->tblDepartment} ";
            $sql .= "(department_is_active, department_name, department_created, department_updated) values ";
            $sql .= "(:department_is_active, :department_name, :department_created, :department_updated)";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "department_is_active" => $this->department_is_active,
                "department_name" => $this->department_name,
                "department_created" => $this->department_created,
                "department_updated" => $this->department_updated,
            ]);
        } catch (PDOException $e) {
            $query = false;
        }

        return $query;
    }

    public function readAll() {
        try {
            $sql = "select ";
            $sql .= " * ";
            $sql .= "from {$this->tblDepartment} ";
            $sql .= "where true ";
            $sql .= $this->department_is_active != ""
                ? " and department_is_active = :department_is_active "
                : " ";
            $sql .= $this->search != "" ? " and ( " : " ";
            $sql .= $this->search != "" ? " department_name like :department_name " : " ";
            $sql .= $this->search != "" ? " ) " : " ";
            $sql .= " order by department_created desc ";

            $query = $this->connection->prepare($sql);
            $query->execute([
                ...$this->department_is_active != "" ? ["department_is_active" => $this->department_is_active] : [],
                ...$this->search != "" ? [
                    "department_name" => "%{$this->search}%",
                ] : [],
            ]);
        } catch (PDOException $e) {
            $query = false;
        }

        return $query;
    }

    public function readLimit() {
        try {
            $sql = "select ";
            $sql .= " * ";
            $sql .= "from {$this->tblDepartment} ";
            $sql .= "where true ";
            $sql .= $this->department_is_active != ""
                ? " and department_is_active = :department_is_active "
                : " ";
            $sql .= $this->search != "" ? " and ( " : " ";
            $sql .= $this->search != "" ? " department_name like :department_name " : " ";
            $sql .= $this->search != "" ? " ) " : " ";
            $sql .= " order by department_created desc ";
            $sql .= " limit :start, :total ";

            $query = $this->connection->prepare($sql);
            $query->bindValue(":start", $this->start, PDO::PARAM_INT);
            $query->bindValue(":total", $this->total, PDO::PARAM_INT);

            if ($this->department_is_active != "") {
                $query->bindValue(":department_is_active", $this->department_is_active, PDO::PARAM_INT);
            }

            if ($this->search != "") {
                $query->bindValue(":department_name", "%{$this->search}%");
            }

            $query->execute();
        } catch (PDOException $e) {
            returnError($e);
            $query = false;
        }

        return $query;
    }

    public function update() {
        try {
            $sql = "update {$this->tblDepartment} set ";
            $sql .= "department_name = :department_name, ";
            $sql .= "department_updated = :department_updated ";
            $sql .= "where department_aid = :department_aid ";

            $query = $this->connection->prepare($sql);
            $query->execute([
                "department_name" => $this->department_name,
                "department_updated" => $this->department_updated,
                "department_aid" => $this->department_aid,
            ]);
        } catch (PDOException $e) {
            $query = false;
        }

        return $query;
    }

    public function active() {
        try {
            $sql = "update {$this->tblDepartment} ";
            $sql .= "set department_is_active = if(department_is_active = 1, 0, 1) ";
            $sql .= "where department_aid = :department_aid ";

            $query = $this->connection->prepare($sql);
            $query->execute([
                "department_aid" => $this->department_aid,
            ]);
        } catch (PDOException $e) {
            $query = false;
        }

        return $query;
    }

    public function delete() {
        try {
            $sql = "delete from {$this->tblDepartment} where department_aid = :department_aid ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "department_aid" => $this->department_aid,
            ]);
        } catch (PDOException $e) {
            $query = false;
        }

        return $query;
    }
}